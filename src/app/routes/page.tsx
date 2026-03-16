'use client';

import Image from 'next/image';
import Link from 'next/link';
import { JEEPNEY_ROUTES } from '@/lib/routes-data';

export default function RoutesPage() {
  return (
    <div className="min-h-screen bg-base-100 overflow-y-auto">
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b border-white/10"
        style={{
          background: 'rgba(15, 23, 42, 0.92)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-3 pl-16">
          <Link
            href="/"
            className="btn btn-ghost btn-circle btn-sm text-white/60 hover:text-white"
          >
            ←
          </Link>
          <div>
            <h1 className="text-lg font-bold text-white">All Routes</h1>
            <p className="text-[10px] font-medium uppercase tracking-widest text-amber-400/70">
              Metro Cebu Jeepney Network
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6 pb-12 space-y-8">
        {/* Reference Map */}
        <section className="animate-fade-in-up">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-white/40">
            📍 Metro Cebu Transport Network
          </h2>
          <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <div className="relative w-full" style={{ aspectRatio: '2/1' }}>
              <Image
                src="/images/metro-cebu-route-map.png"
                alt="Metro Cebu Transport Network Map — showing all jeepney routes across Cebu City, Mandaue, Talisay, and surrounding areas"
                fill
                className="object-contain bg-base-200"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
            </div>
            <div className="bg-white/5 px-4 py-3 border-t border-white/10">
              <p className="text-xs text-white/50">
                Official Metro Cebu Transport Network Map — shows all jeepney,
                bus, and transit routes across the metro area.
              </p>
            </div>
          </div>
        </section>

        {/* Route Cards */}
        <section>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-white/40">
            🚐 Available Routes ({JEEPNEY_ROUTES.length})
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {JEEPNEY_ROUTES.map((route, routeIdx) => (
              <div
                key={route.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/10 hover:border-white/20 hover:shadow-lg animate-fade-in-up"
                style={{ animationDelay: `${routeIdx * 80}ms` }}
              >
                <div className="flex items-start gap-3">
                  {/* Route badge */}
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white font-black text-base shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${route.color}, ${route.color}CC)`,
                    }}
                  >
                    {route.code}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-white">
                      {route.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-white/50">
                      {route.description}
                    </p>

                    {/* Stops chain */}
                    <div className="mt-3 flex items-center flex-wrap gap-y-1">
                      {route.stops.map((stop, i) => (
                        <span key={i} className="inline-flex items-center">
                          <span
                            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
                            style={{
                              background: `${route.color}15`,
                              color: route.color,
                            }}
                          >
                            {i === 0
                              ? '🚐'
                              : i === route.stops.length - 1
                              ? '🏁'
                              : '•'}{' '}
                            {stop.name}
                          </span>
                          {i < route.stops.length - 1 && (
                            <span className="mx-0.5 text-[10px] text-white/20">
                              →
                            </span>
                          )}
                        </span>
                      ))}
                    </div>

                    {/* Fare & stats */}
                    <div className="mt-3 flex items-center gap-3 border-t border-white/5 pt-2">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400">
                        <span className="text-[10px]">💰</span> ₱
                        {route.baseFare.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-white/30">
                        +₱{route.farePerKm}/km after {route.baseDistanceKm}km
                      </span>
                      <span className="ml-auto text-[10px] font-medium text-white/30">
                        {route.stops.length} stops
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer note */}
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-4">
          <p className="text-xs text-amber-300 leading-relaxed">
            ⚠️ Route data is approximate and based on commonly known jeepney
            paths. Actual routes may vary — always confirm with drivers or
            locals at the parada. Fare information is based on LTFRB minimum
            fare guidelines.
          </p>
        </div>
      </main>
    </div>
  );
}
