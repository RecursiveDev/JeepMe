'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Coordinate } from '@/lib/types';
import { searchPlaces, PlaceResult } from '@/lib/geocoding-service';

interface PlaceSearchProps {
  placeholder: string;
  label: string;
  color: string;
  value: Coordinate | null;
  displayName: string | null;
  onSelect: (coord: Coordinate, name: string) => void;
}

export default function PlaceSearch({
  placeholder,
  label,
  color,
  value,
  displayName,
  onSelect,
}: PlaceSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setQuery(val);
      setIsOpen(true);

      if (debounceRef.current) clearTimeout(debounceRef.current);

      if (val.trim().length < 2) {
        setResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      debounceRef.current = setTimeout(async () => {
        const places = await searchPlaces(val);
        setResults(places);
        setIsSearching(false);
      }, 500);
    },
    []
  );

  const handleSelect = useCallback(
    (place: PlaceResult) => {
      onSelect(place.coordinate, place.shortName);
      setQuery('');
      setResults([]);
      setIsOpen(false);
    },
    [onSelect]
  );

  // Show display name if value is set and not actively searching
  const showValue = value && !isOpen;

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2.5">
        <div
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black text-white"
          style={{ background: color }}
        >
          {label}
        </div>
        <div className="flex-1 min-w-0">
          {showValue ? (
            <p className="text-sm font-medium text-white truncate">
              {displayName || `${value.lat.toFixed(4)}, ${value.lng.toFixed(4)}`}
            </p>
          ) : (
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              onFocus={() => setIsOpen(true)}
              placeholder={placeholder}
              className="w-full bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
            />
          )}
        </div>
        {/* Search icon or loading spinner */}
        {isSearching ? (
          <span className="loading loading-spinner loading-xs text-white/40" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4 shrink-0 text-white/30"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>

      {/* Search results dropdown */}
      {isOpen && results.length > 0 && (
        <div
          className="absolute left-0 right-0 top-full z-50 mt-1 max-h-48 overflow-y-auto rounded-xl border border-white/10 shadow-2xl"
          style={{
            background: 'rgba(15, 23, 42, 0.96)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {results.map((place, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(place)}
              className="w-full px-3 py-2.5 text-left transition-colors hover:bg-white/10 border-b border-white/5 last:border-b-0"
            >
              <p className="text-sm font-medium text-white truncate">
                📍 {place.shortName}
              </p>
              <p className="text-[10px] text-white/40 truncate mt-0.5">
                {place.displayName}
              </p>
            </button>
          ))}
        </div>
      )}

      {/* No results message */}
      {isOpen && query.length >= 2 && !isSearching && results.length === 0 && (
        <div
          className="absolute left-0 right-0 top-full z-50 mt-1 rounded-xl border border-white/10 px-3 py-3 text-center"
          style={{
            background: 'rgba(15, 23, 42, 0.96)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <p className="text-xs text-white/40">No places found in Cebu area</p>
        </div>
      )}
    </div>
  );
}
