'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MatchedRoute } from '@/lib/types';

interface BottomSheetProps {
  matchedRoute: MatchedRoute | null;
  allRoutes: MatchedRoute[];
  onSelectRoute: (route: MatchedRoute) => void;
  onClose: () => void;
}

/** Format walk distance: show meters if <1km, else km */
function formatWalkDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)}m`;
  return `${km.toFixed(1)} km`;
}

/** Estimate walk time in minutes (~5 km/h walking speed) */
function estimateWalkTime(km: number): number {
  return Math.max(1, Math.ceil((km / 5) * 60));
}

export default function BottomSheet({
  matchedRoute,
  allRoutes,
  onSelectRoute,
  onClose,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const isVisible = allRoutes.length > 0;

  // GSAP slide animation
  useEffect(() => {
    if (!sheetRef.current) return;

    if (isVisible) {
      gsap.fromTo(
        sheetRef.current,
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.5, ease: 'power3.out' }
      );
    } else {
      gsap.to(sheetRef.current, {
        y: '100%',
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const selected = matchedRoute ?? allRoutes[0];

  return (
    <div
      ref={sheetRef}
      className="fixed bottom-0 left-0 right-0 z-[1100] max-h-[65vh] overflow-y-auto rounded-t-3xl border-t border-white/10 shadow-2xl"
      style={{
        background: 'rgba(15, 23, 42, 0.92)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
      }}
    >
      {/* Drag handle */}
      <div className="sticky top-0 z-10 flex justify-center py-3" style={{background: 'rgba(15, 23, 42, 0.92)'}}>
        <div className="h-1 w-10 rounded-full bg-white/20" />
      </div>

      <div className="px-5 pb-6">
        {/* Route selector tabs (if multiple matches) */}
        {allRoutes.length > 1 && (
          <div className="mb-4 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {allRoutes.map((r) => (
              <button
                key={r.route.id}
                onClick={() => onSelectRoute(r)}
                className={`btn btn-sm rounded-xl border-0 font-bold text-xs whitespace-nowrap transition-all ${
                  selected.route.id === r.route.id
                    ? 'text-white shadow-lg'
                    : 'bg-white/10 text-white/50 hover:text-white'
                }`}
                style={
                  selected.route.id === r.route.id
                    ? { background: r.route.color }
                    : undefined
                }
              >
                🚐 {r.route.code}
              </button>
            ))}
          </div>
        )}

        {/* Route header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl text-white font-black text-lg shadow-lg"
              style={{ background: selected.route.color }}
            >
              {selected.route.code}
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {selected.route.name}
              </h2>
              <p className="text-xs text-white/50">
                {selected.route.description}
              </p>
            </div>
          </div>
          <button
            className="btn btn-ghost btn-sm btn-circle text-white/40 hover:text-white"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Stats row */}
        <div className="mb-5 grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-white/5 p-3 text-center">
            <p className="text-xs text-white/40 font-medium">Base Fare</p>
            <p className="text-lg font-black text-amber-400">
              ₱{selected.route.baseFare.toFixed(2)}
            </p>
          </div>
          <div className="rounded-xl bg-white/5 p-3 text-center">
            <p className="text-xs text-white/40 font-medium">Est. Fare</p>
            <p className="text-lg font-black text-emerald-400">
              ₱{selected.estimatedFare.toFixed(2)}
            </p>
          </div>
          <div className="rounded-xl bg-white/5 p-3 text-center">
            <p className="text-xs text-white/40 font-medium">Distance</p>
            <p className="text-lg font-black text-sky-400">
              {selected.totalDistance} km
            </p>
          </div>
        </div>

        {/* Steps visualization */}
        <div className="rounded-xl bg-white/5 p-4">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-white/40">
            Route Instructions
          </h3>

          <ul className="steps steps-vertical w-full">
            {/* Walk to boarding point */}
            <li className="step step-warning" data-content="🚶">
              <div className="text-left">
                <p className="text-sm font-bold text-amber-400">
                  Walk to {selected.boardAt.name}
                </p>
                <p className="text-xs text-white/50">
                  {formatWalkDistance(selected.boardDistance)} • ~{estimateWalkTime(selected.boardDistance)} min walk from origin
                </p>
              </div>
            </li>

            {/* Board jeepney */}
            <li className="step step-success" data-content="🚐">
              <div className="text-left">
                <p className="text-sm font-bold text-emerald-400">
                  Board {selected.route.code} at {selected.boardAt.name}
                </p>
                <p className="text-xs text-white/50">
                  Look for the &ldquo;{selected.route.code}&rdquo; signboard
                </p>
              </div>
            </li>

            {/* Ride segment */}
            <li className="step step-success" data-content="🛣️">
              <div className="text-left">
                <p className="text-sm font-bold text-white">
                  Ride along {selected.route.name}
                </p>
                <p className="text-xs text-white/50">
                  {selected.totalDistance} km • ~{Math.ceil(selected.totalDistance * 3)} min ride
                </p>
              </div>
            </li>

            {/* Alight */}
            <li className="step step-error" data-content="🛑">
              <div className="text-left">
                <p className="text-sm font-bold text-red-400">
                  Alight at {selected.alightAt.name}
                </p>
                <p className="text-xs text-white/50">
                  Tell the driver: &ldquo;Para po, {selected.alightAt.name}&rdquo;
                </p>
              </div>
            </li>

            {/* Walk to destination */}
            <li className="step step-warning" data-content="🚶">
              <div className="text-left">
                <p className="text-sm font-bold text-amber-400">
                  Walk to your destination
                </p>
                <p className="text-xs text-white/50">
                  {formatWalkDistance(selected.alightDistance)} • ~{estimateWalkTime(selected.alightDistance)} min walk to destination
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* Walking tip */}
        {(selected.boardDistance > 0.5 || selected.alightDistance > 0.5) && (
          <div className="mt-3 rounded-xl bg-amber-500/10 border border-amber-500/20 p-3">
            <p className="text-xs text-amber-300">
              ⚠️ Walking is required to reach the nearest jeepney stop. Ask
              locals for the nearest parada!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
