'use client';

import dynamic from 'next/dynamic';
import { Coordinate, MatchedRoute } from '@/lib/types';

const MapView = dynamic(() => import('./MapView'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-base-300">
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-base-content/60 text-sm font-medium tracking-wide animate-pulse">
          Loading Cebu Map...
        </p>
      </div>
    </div>
  ),
});

interface MapWrapperProps {
  origin: Coordinate | null;
  destination: Coordinate | null;
  matchedRoute: MatchedRoute | null;
  onMapClick: (coord: Coordinate) => void;
  onLocate: (coord: Coordinate) => void;
}

export default function MapWrapper(props: MapWrapperProps) {
  return <MapView {...props} />;
}
