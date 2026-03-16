'use client';

import { Coordinate, AppState } from '@/lib/types';
import PlaceSearch from '@/components/PlaceSearch';

interface SearchCardProps {
  origin: Coordinate | null;
  destination: Coordinate | null;
  originName: string | null;
  destinationName: string | null;
  appState: AppState;
  onFindRoute: () => void;
  onClear: () => void;
  onPlaceSelect: (type: 'origin' | 'destination', coord: Coordinate, name: string) => void;
}

export default function SearchCard({
  origin,
  destination,
  originName,
  destinationName,
  appState,
  onFindRoute,
  onClear,
  onPlaceSelect,
}: SearchCardProps) {
  const isSearching = appState === 'searching';
  const canSearch = origin !== null && destination !== null && !isSearching;

  // Derive instruction hint
  const getHint = () => {
    if (!origin) return '👆 Tap the map or search for your origin';
    if (!destination) return '👆 Tap again or search for your destination';
    if (appState === 'searching') return '🔍 Finding the best jeepney route...';
    if (appState === 'results') return '✅ Route found! See details below';
    return '🚐 Ready to find your jeepney!';
  };

  return (
    <div className="absolute top-4 left-1/2 z-[1000] w-[92%] max-w-md -translate-x-1/2">
      <div
        className="rounded-2xl border border-white/15 p-4 shadow-2xl"
        style={{
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {/* Header */}
        <div className="mb-3 flex items-center gap-2">
          <span className="text-2xl">🚐</span>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">
              JeepMe
            </h1>
            <p className="text-[10px] font-medium uppercase tracking-widest text-amber-400/80">
              Cebu Jeepney Finder
            </p>
          </div>
        </div>

        {/* Input display — with place search */}
        <div className="space-y-2 mb-3">
          {/* Origin */}
          <PlaceSearch
            placeholder="Search origin or tap map..."
            label="A"
            color="#10B981"
            value={origin}
            displayName={originName}
            onSelect={(coord, name) => onPlaceSelect('origin', coord, name)}
          />

          {/* Destination */}
          <PlaceSearch
            placeholder="Search destination or tap map..."
            label="B"
            color="#EF4444"
            value={destination}
            displayName={destinationName}
            onSelect={(coord, name) => onPlaceSelect('destination', coord, name)}
          />
        </div>

        {/* Hint text */}
        <p className="mb-3 text-center text-xs text-white/50">{getHint()}</p>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            className={`btn btn-primary flex-1 rounded-xl border-0 font-bold tracking-wide text-sm ${
              isSearching ? 'btn-disabled' : ''
            }`}
            onClick={onFindRoute}
            disabled={!canSearch}
            style={{
              background: canSearch
                ? 'linear-gradient(135deg, #F59E0B, #D97706)'
                : undefined,
            }}
          >
            {isSearching ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                Searching...
              </>
            ) : (
              '🔍 Find Jeepney'
            )}
          </button>

          {(origin || destination) && (
            <button
              className="btn btn-ghost btn-sm rounded-xl text-white/60 hover:text-white hover:bg-white/10"
              onClick={onClear}
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
