// ─── Core Geospatial Types ─────────────────────────────────────────────────

export interface Coordinate {
  lat: number;
  lng: number;
}

export interface RouteStop {
  name: string;
  coordinate: Coordinate;
}

// ─── Jeepney Route Definition ──────────────────────────────────────────────

export interface JeepneyRoute {
  id: string;
  code: string;           // e.g. "13C"
  name: string;           // e.g. "Banawa – Ayala"
  description: string;    // human-readable route description
  color: string;          // hex color for map polyline
  baseFare: number;       // base fare in PHP (₱15.00)
  farePerKm: number;      // additional fare per km beyond base distance
  baseDistanceKm: number; // distance covered by the base fare
  stops: RouteStop[];     // major stops/landmarks
  path: Coordinate[];     // full polyline coordinates for the route
}

// ─── Matched Route Result ──────────────────────────────────────────────────

export interface MatchedRoute {
  route: JeepneyRoute;
  boardAt: RouteStop;
  alightAt: RouteStop;
  boardDistance: number;   // km from origin to boarding stop
  alightDistance: number;  // km from destination to alighting stop
  totalDistance: number;   // km along the route segment
  estimatedFare: number;  // computed fare in PHP
  segmentPath: Coordinate[]; // polyline segment between board and alight
}

// ─── UI State Types ────────────────────────────────────────────────────────

export interface MapPin {
  type: 'origin' | 'destination';
  coordinate: Coordinate;
  label: string;
}

export type AppState = 'idle' | 'origin-set' | 'destination-set' | 'searching' | 'results';

export type MapStyle = 'standard' | 'dark' | 'satellite';
