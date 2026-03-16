'use client';

import { useState, useCallback } from 'react';
import { Coordinate, MatchedRoute, AppState } from '@/lib/types';
import { routeService } from '@/lib/route-service';
import { reverseGeocode } from '@/lib/geocoding-service';
import MapWrapper from '@/components/MapWrapper';
import SearchCard from '@/components/SearchCard';
import BottomSheet from '@/components/BottomSheet';

export default function HomePage() {
  const [origin, setOrigin] = useState<Coordinate | null>(null);
  const [destination, setDestination] = useState<Coordinate | null>(null);
  const [originName, setOriginName] = useState<string | null>(null);
  const [destinationName, setDestinationName] = useState<string | null>(null);
  const [matchedRoutes, setMatchedRoutes] = useState<MatchedRoute[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<MatchedRoute | null>(null);
  const [appState, setAppState] = useState<AppState>('idle');
  const [noResults, setNoResults] = useState(false);

  // Reverse geocode a coordinate and set the name
  const geocodeAndSetName = useCallback(
    async (coord: Coordinate, setter: (name: string | null) => void) => {
      setter(null); // Clear immediately
      const name = await reverseGeocode(coord.lat, coord.lng);
      setter(name);
    },
    []
  );

  // Handle map click to place pins
  const handleMapClick = useCallback(
    (coord: Coordinate) => {
      // Allow re-pinning when showing results (clear first)
      if (appState === 'results') {
        setMatchedRoutes([]);
        setSelectedRoute(null);
        setNoResults(false);
      }

      if (!origin || appState === 'results') {
        setOrigin(coord);
        setDestination(null);
        setDestinationName(null);
        setAppState('origin-set');
        geocodeAndSetName(coord, setOriginName);
      } else if (!destination) {
        setDestination(coord);
        setAppState('destination-set');
        geocodeAndSetName(coord, setDestinationName);
      }
    },
    [origin, destination, appState, geocodeAndSetName]
  );

  // Handle GPS geolocation — sets origin
  const handleLocate = useCallback(
    (coord: Coordinate) => {
      setOrigin(coord);
      setDestination(null);
      setDestinationName(null);
      setMatchedRoutes([]);
      setSelectedRoute(null);
      setNoResults(false);
      setAppState('origin-set');
      geocodeAndSetName(coord, setOriginName);
    },
    [geocodeAndSetName]
  );

  // Handle place search selection
  const handlePlaceSelect = useCallback(
    (type: 'origin' | 'destination', coord: Coordinate, name: string) => {
      if (type === 'origin') {
        setOrigin(coord);
        setOriginName(name);
        if (!destination) {
          setAppState('origin-set');
        } else {
          setAppState('destination-set');
        }
        // Clear results if re-searching
        setMatchedRoutes([]);
        setSelectedRoute(null);
        setNoResults(false);
      } else {
        setDestination(coord);
        setDestinationName(name);
        setAppState('destination-set');
      }
    },
    [destination]
  );

  // Find matching jeepney routes
  const handleFindRoute = useCallback(() => {
    if (!origin || !destination) return;

    setAppState('searching');
    setNoResults(false);

    // Simulate brief loading for UX feel
    setTimeout(() => {
      const results = routeService.findRoutes(origin, destination);
      setMatchedRoutes(results);
      setSelectedRoute(results.length > 0 ? results[0] : null);
      setAppState('results');

      if (results.length === 0) {
        setNoResults(true);
        // Auto-dismiss the "no results" toast after 4s
        setTimeout(() => setNoResults(false), 4000);
      }
    }, 600);
  }, [origin, destination]);

  // Select a specific route from multiple matches
  const handleSelectRoute = useCallback((route: MatchedRoute) => {
    setSelectedRoute(route);
  }, []);

  // Clear all state
  const handleClear = useCallback(() => {
    setOrigin(null);
    setDestination(null);
    setOriginName(null);
    setDestinationName(null);
    setMatchedRoutes([]);
    setSelectedRoute(null);
    setAppState('idle');
    setNoResults(false);
  }, []);

  // Close bottom sheet
  const handleCloseSheet = useCallback(() => {
    setMatchedRoutes([]);
    setSelectedRoute(null);
    setAppState('destination-set');
  }, []);

  return (
      <div className="relative h-screen w-screen overflow-hidden">
        {/* Full-screen Map */}
        <MapWrapper
          origin={origin}
          destination={destination}
          matchedRoute={selectedRoute}
          onMapClick={handleMapClick}
          onLocate={handleLocate}
        />

        {/* Glassmorphism Search Card */}
        <SearchCard
          origin={origin}
          destination={destination}
          originName={originName}
          destinationName={destinationName}
          appState={appState}
          onFindRoute={handleFindRoute}
          onClear={handleClear}
          onPlaceSelect={handlePlaceSelect}
        />

        {/* Route Results Bottom Sheet */}
        <BottomSheet
          matchedRoute={selectedRoute}
          allRoutes={matchedRoutes}
          onSelectRoute={handleSelectRoute}
          onClose={handleCloseSheet}
        />

        {/* No results feedback */}
        {noResults && (
          <div className="fixed bottom-8 left-1/2 z-[1100] -translate-x-1/2 animate-fade-in-up">
            <div
              className="rounded-2xl px-6 py-4 shadow-2xl border border-amber-500/20"
              style={{
                background: 'rgba(15, 23, 42, 0.9)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <p className="text-sm font-medium text-amber-300">
                😔 No jeepney routes found for this pair.
              </p>
              <p className="mt-1 text-xs text-white/40">
                Try moving your pins closer to major roads.
              </p>
            </div>
          </div>
        )}
      </div>
  );
}
