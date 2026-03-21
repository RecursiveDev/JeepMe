import { Coordinate } from './types';

// ─── OSRM Route Snapping Service ───────────────────────────────────────────
// Uses the free OSRM demo server to snap waypoints to real streets.
const OSRM_BASE = 'https://router.project-osrm.org';

// In-memory cache for snapped routes
const snappedCache = new Map<string, Coordinate[]>();
// {R{R{R{R}}}}
/**
 * Snap a sequence of waypoints to actual streets using OSRM.
 * Returns a detailed coordinate array that follows real roads.
 * Falls back to the original waypoints on error.
 */
export async function snapRouteToStreets(
  waypoints: Coordinate[]
): Promise<Coordinate[]> {
  if (waypoints.length < 2) return waypoints;

  const cacheKey = waypoints.map((w) => `${w.lat},${w.lng}`).join('|');
  const cached = snappedCache.get(cacheKey);
  if (cached) return cached;

  try {
    const coords = waypoints.map((w) => `${w.lng},${w.lat}`).join(';');
    const url = `${OSRM_BASE}/route/v1/driving/${coords}?overview=full&geometries=geojson`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`OSRM ${res.status}`);

    const data = await res.json();
    if (data.code !== 'Ok' || !data.routes?.[0]?.geometry) {
      throw new Error('No route found');
    }

    const snapped: Coordinate[] = data.routes[0].geometry.coordinates.map(
      ([lng, lat]: [number, number]) => ({ lat, lng })
    );

    snappedCache.set(cacheKey, snapped);
    return snapped;
  } catch {
    // Fallback to original waypoints
    snappedCache.set(cacheKey, waypoints);
    return waypoints;
  }
}

/**
 * Snap multiple routes in parallel with staggering to respect rate limits.
 * Returns a Map of routeId → snapped path.
 */
export async function snapAllRoutes(
  routes: { id: string; path: Coordinate[] }[]
): Promise<Map<string, Coordinate[]>> {
  const results = new Map<string, Coordinate[]>();
  const BATCH_SIZE = 5;
  const DELAY_MS = 200;

  for (let i = 0; i < routes.length; i += BATCH_SIZE) {
    const batch = routes.slice(i, i + BATCH_SIZE);
    const promises = batch.map(async (route) => {
      const snapped = await snapRouteToStreets(route.path);
      results.set(route.id, snapped);
    });
    await Promise.all(promises);

    // Stagger between batches
    if (i + BATCH_SIZE < routes.length) {
      await new Promise((r) => setTimeout(r, DELAY_MS));
    }
  }

  return results;
}
