'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Coordinate, MatchedRoute, MapStyle } from '@/lib/types';
import { JEEPNEY_ROUTES, LANDMARKS } from '@/lib/routes-data';
import { snapAllRoutes, snapRouteToStreets } from '@/lib/osrm-service';

// ─── Cebu City center coordinates ──────────────────────────────────────────
const CEBU_CENTER: L.LatLngExpression = [10.3157, 123.8854];
const DEFAULT_ZOOM = 14;

// ─── Tile Layer Configs ────────────────────────────────────────────────────
const TILE_LAYERS: Record<MapStyle, { url: string; attribution: string; subdomains?: string; maxZoom: number }> = {
  standard: {
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  },
  dark: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri, Maxar, Earthstar Geographics',
    maxZoom: 18,
  },
};

const STYLE_LABELS: Record<MapStyle, { icon: string; label: string }> = {
  standard: { icon: '🗺️', label: 'Standard' },
  dark: { icon: '🌙', label: 'Dark' },
  satellite: { icon: '🛰️', label: 'Satellite' },
};

const STYLE_ORDER: MapStyle[] = ['standard', 'dark', 'satellite'];

// ─── Landmark display names ───────────────────────────────────────────────
const LANDMARK_LABELS: Record<string, { label: string; icon: string }> = {
  CARBON: { label: 'Carbon Market', icon: '🛒' },
  COLON: { label: 'Colon St', icon: '🏛️' },
  FUENTE: { label: 'Fuente Osmeña', icon: '⛲' },
  CAPITOL: { label: 'Capitol', icon: '🏛️' },
  SM_CITY: { label: 'SM City Cebu', icon: '🏬' },
  AYALA: { label: 'Ayala Center', icon: '🏬' },
  IT_PARK: { label: 'IT Park', icon: '🏢' },
  JY_SQUARE: { label: 'JY Square', icon: '🏬' },
  TALAMBAN: { label: 'Talamban', icon: '📍' },
  MABOLO: { label: 'Mabolo', icon: '📍' },
  BANAWA: { label: 'Banawa', icon: '📍' },
  GUADALUPE: { label: 'Guadalupe', icon: '📍' },
  PARDO: { label: 'Pardo', icon: '📍' },
  MANDAUE_CITY: { label: 'Mandaue City', icon: '🏙️' },
  PARKMALL: { label: 'Parkmall', icon: '🏬' },
  SRP: { label: 'SRP', icon: '🏗️' },
  UP_CEBU: { label: 'UP Cebu', icon: '🎓' },
  BUSAY: { label: 'Busay', icon: '🏔️' },
  PIER: { label: 'Pier Area', icon: '⚓' },
  CONSOLACION: { label: 'Consolacion', icon: '📍' },
  TALISAY: { label: 'Talisay', icon: '📍' },
};

interface MapViewProps {
  origin: Coordinate | null;
  destination: Coordinate | null;
  matchedRoute: MatchedRoute | null;
  onMapClick: (coord: Coordinate) => void;
  onLocate: (coord: Coordinate) => void;
}

// Custom icon factory
function createIcon(color: string, label: string): L.DivIcon {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 50% 50% 50% 0;
        background: ${color};
        transform: rotate(-45deg);
        box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        border: 3px solid white;
      ">
        <span style="
          transform: rotate(45deg);
          color: white;
          font-weight: 800;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
        ">${label}</span>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });
}

export default function MapView({
  origin,
  destination,
  matchedRoute,
  onMapClick,
  onLocate,
}: MapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const originMarkerRef = useRef<L.Marker | null>(null);
  const destMarkerRef = useRef<L.Marker | null>(null);
  const routeLayerRef = useRef<L.LayerGroup | null>(null);
  const allRoutesLayerRef = useRef<L.LayerGroup | null>(null);
  const landmarksLayerRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const locationMarkerRef = useRef<L.CircleMarker | null>(null);
  const snappedPathsRef = useRef<Map<string, Coordinate[]>>(new Map());

  const [mapStyle, setMapStyle] = useState<MapStyle>('standard');

  // ─── Initialize map ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: CEBU_CENTER,
      zoom: DEFAULT_ZOOM,
      zoomControl: false,
      attributionControl: true,
    });

    // Initial tile layer
    const cfg = TILE_LAYERS.standard;
    tileLayerRef.current = L.tileLayer(cfg.url, {
      attribution: cfg.attribution,
      subdomains: cfg.subdomains || '',
      maxZoom: cfg.maxZoom,
    }).addTo(map);

    // Zoom control bottom-right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Layer groups
    allRoutesLayerRef.current = L.layerGroup().addTo(map);
    routeLayerRef.current = L.layerGroup().addTo(map);
    landmarksLayerRef.current = L.layerGroup().addTo(map);

    mapRef.current = map;

    // ── Draw all routes preview (straight lines first, then snap to streets) ──
    const drawPreviewRoutes = (snapped?: Map<string, Coordinate[]>) => {
      const layer = allRoutesLayerRef.current;
      if (!layer) return;
      layer.clearLayers();

      JEEPNEY_ROUTES.forEach((route) => {
        const path = snapped?.get(route.id) ?? route.path;
        const coords: L.LatLngExpression[] = path.map((c) => [c.lat, c.lng]);
        L.polyline(coords, {
          color: route.color,
          weight: 2,
          opacity: 0.2,
          dashArray: '6, 6',
        }).addTo(layer);
      });
    };

    // Draw with straight lines immediately
    drawPreviewRoutes();

    // Then snap all routes to streets in the background
    snapAllRoutes(JEEPNEY_ROUTES.map((r) => ({ id: r.id, path: r.path }))).then(
      (snapped) => {
        snappedPathsRef.current = snapped;
        drawPreviewRoutes(snapped);
      }
    );

    // ── Draw landmarks ──────────────────────────────────────────────────
    const drawLandmarks = () => {
      const layer = landmarksLayerRef.current;
      if (!layer) return;
      layer.clearLayers();

      const zoom = map.getZoom();
      if (zoom < 13) return; // Only show landmarks at zoom >= 13

      Object.entries(LANDMARKS).forEach(([key, coord]) => {
        const info = LANDMARK_LABELS[key];
        if (!info) return;

        const marker = L.circleMarker([coord.lat, coord.lng], {
          radius: zoom >= 15 ? 6 : 4,
          fillColor: '#F59E0B',
          fillOpacity: 0.8,
          color: '#fff',
          weight: 1.5,
        });

        marker.bindTooltip(
          `<span style="font-size:11px">${info.icon} ${info.label}</span>`,
          {
            permanent: zoom >= 15,
            direction: 'top',
            offset: [0, -6],
            className: 'landmark-tooltip',
          }
        );

        marker.addTo(layer);
      });
    };

    drawLandmarks();
    map.on('zoomend', drawLandmarks);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // ─── Swap tile layer when mapStyle changes ──────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const cfg = TILE_LAYERS[mapStyle];
    tileLayerRef.current = L.tileLayer(cfg.url, {
      attribution: cfg.attribution,
      subdomains: cfg.subdomains || '',
      maxZoom: cfg.maxZoom,
    }).addTo(map);

    // Move tile layer to bottom so overlays stay on top
    tileLayerRef.current.bringToBack();
  }, [mapStyle]);

  // ─── Handle map click ──────────────────────────────────────────────────
  const handleMapClick = useCallback(
    (e: L.LeafletMouseEvent) => {
      onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
    [onMapClick]
  );

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    map.on('click', handleMapClick);
    return () => {
      map.off('click', handleMapClick);
    };
  }, [handleMapClick]);

  // ─── Update origin marker ──────────────────────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (originMarkerRef.current) {
      originMarkerRef.current.remove();
      originMarkerRef.current = null;
    }

    if (origin) {
      const marker = L.marker([origin.lat, origin.lng], {
        icon: createIcon('#10B981', 'A'),
      })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:Inter,sans-serif;font-weight:600;color:#1E293B">📍 Origin</div>
           <div style="font-size:12px;color:#64748B">${origin.lat.toFixed(4)}, ${origin.lng.toFixed(4)}</div>`
        );
      originMarkerRef.current = marker;
    }
  }, [origin]);

  // ─── Update destination marker ─────────────────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (destMarkerRef.current) {
      destMarkerRef.current.remove();
      destMarkerRef.current = null;
    }

    if (destination) {
      const marker = L.marker([destination.lat, destination.lng], {
        icon: createIcon('#EF4444', 'B'),
      })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:Inter,sans-serif;font-weight:600;color:#1E293B">🏁 Destination</div>
           <div style="font-size:12px;color:#64748B">${destination.lat.toFixed(4)}, ${destination.lng.toFixed(4)}</div>`
        );
      destMarkerRef.current = marker;
    }
  }, [destination]);

  // ─── Render matched route polyline ─────────────────────────────────────
  useEffect(() => {
    const layer = routeLayerRef.current;
    if (!layer) return;
    layer.clearLayers();

    if (matchedRoute) {
      const { segmentPath, route, boardAt, alightAt } = matchedRoute;

      // Use OSRM-snapped full route path if available
      const snappedFull = snappedPathsRef.current.get(route.id);
      const fullPath = snappedFull ?? route.path;
      const fullLatLngs: L.LatLngExpression[] = fullPath.map((c) => [c.lat, c.lng]);
      L.polyline(fullLatLngs, {
        color: route.color,
        weight: 3,
        opacity: 0.2,
        dashArray: '8, 8',
      }).addTo(layer);

      // Snap the active segment to streets too
      snapRouteToStreets(segmentPath).then((snappedSeg) => {
        const segLatLngs: L.LatLngExpression[] = snappedSeg.map((c) => [c.lat, c.lng]);
        L.polyline(segLatLngs, {
          color: route.color,
          weight: 6,
          opacity: 0.9,
          lineCap: 'round',
        lineJoin: 'round',
        }).addTo(layer);

        // Fit map bounds to the snapped segment
        const map = mapRef.current;
        if (map && segLatLngs.length > 0) {
          const bounds = L.latLngBounds(segLatLngs);
          map.fitBounds(bounds, { padding: [60, 60] });
        }
      });

      // Board stop marker
      L.circleMarker([boardAt.coordinate.lat, boardAt.coordinate.lng], {
        radius: 10,
        fillColor: '#10B981',
        fillOpacity: 1,
        color: '#fff',
        weight: 3,
      })
        .addTo(layer)
        .bindPopup(
          `<div style="font-family:Inter,sans-serif;font-weight:700;color:#10B981">🚐 Board Here</div>
           <div style="font-weight:600">${boardAt.name}</div>`
        );

      // Alight stop marker
      L.circleMarker([alightAt.coordinate.lat, alightAt.coordinate.lng], {
        radius: 10,
        fillColor: '#EF4444',
        fillOpacity: 1,
        color: '#fff',
        weight: 3,
      })
        .addTo(layer)
        .bindPopup(
          `<div style="font-family:Inter,sans-serif;font-weight:700;color:#EF4444">🛑 Alight Here</div>
           <div style="font-weight:600">${alightAt.name}</div>`
        );
    }
  }, [matchedRoute]);

  // ─── Cycle map style ──────────────────────────────────────────────────
  const cycleMapStyle = useCallback(() => {
    setMapStyle((prev) => {
      const idx = STYLE_ORDER.indexOf(prev);
      return STYLE_ORDER[(idx + 1) % STYLE_ORDER.length];
    });
  }, []);

  // ─── GPS Geolocation ──────────────────────────────────────────────────
  const handleLocate = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;

    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coord: Coordinate = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        // Add pulsing location marker
        if (locationMarkerRef.current) {
          locationMarkerRef.current.remove();
        }
        locationMarkerRef.current = L.circleMarker([coord.lat, coord.lng], {
          radius: 10,
          fillColor: '#3B82F6',
          fillOpacity: 0.6,
          color: '#3B82F6',
          weight: 3,
          opacity: 0.3,
          className: 'location-pulse',
        }).addTo(map);

        map.setView([coord.lat, coord.lng], 16, { animate: true });
        onLocate(coord);
      },
      () => {
        // Silently fail — browser denied or unavailable
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, [onLocate]);

  const styleInfo = STYLE_LABELS[mapStyle];

  return (
    <div className="relative h-full w-full">
      <div
        ref={mapContainerRef}
        id="jeepme-map"
        className="absolute inset-0 z-0"
        style={{ height: '100%', width: '100%' }}
      />

      {/* ── Map Controls (top-right) ─────────────────────────────────── */}
      <div className="absolute top-20 right-3 z-[900] flex flex-col gap-2">
        {/* Layer toggle button */}
        <button
          onClick={cycleMapStyle}
          className="map-control-btn"
          title={`Map style: ${styleInfo.label}`}
        >
          <span className="text-base">{styleInfo.icon}</span>
        </button>

        {/* GPS locate button */}
        <button
          onClick={handleLocate}
          className="map-control-btn"
          title="Use my location"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
          </svg>
        </button>
      </div>
    </div>
  );
}
