import { Coordinate } from './types';

// ─── Nominatim Geocoding Service (OpenStreetMap) ───────────────────────────
const NOMINATIM_BASE = 'https://nominatim.openstreetmap.org';

// Cebu metro area bounding box for bounded search
const CEBU_VIEWBOX = '123.7,10.1,124.1,10.6';
// SAMPLE TO PR
// Simple rate-limiter: 1 request per second (Nominatim policy)
let lastRequestTime = 0;
async function rateLimited<T>(fn: () => Promise<T>): Promise<T> {
  const now = Date.now();
  const wait = Math.max(0, 1000 - (now - lastRequestTime));
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  lastRequestTime = Date.now();
  return fn();
}

export interface PlaceResult {
  displayName: string;
  shortName: string;
  coordinate: Coordinate;
}

/**
 * Reverse geocode a coordinate to a human-readable place name.
 * Returns a short name like "Fuente Osmeña Circle" or falls back to coords.
 */
export async function reverseGeocode(
  lat: number,
  lng: number
): Promise<string> {
  try {
    const data = await rateLimited(async () => {
      const res = await fetch(
        `${NOMINATIM_BASE}/reverse?lat=${lat}&lon=${lng}&format=json&zoom=18&addressdetails=1`,
        { headers: { 'User-Agent': 'JeepMe-CebuTransit/1.0' } }
      );
      if (!res.ok) throw new Error('Geocode failed');
      return res.json();
    });

    // Build a short, useful name from address parts
    const addr = data.address || {};
    const parts: string[] = [];

    // Prefer specific names first
    if (addr.road) parts.push(addr.road);
    else if (addr.pedestrian) parts.push(addr.pedestrian);

    if (addr.neighbourhood) parts.push(addr.neighbourhood);
    else if (addr.suburb) parts.push(addr.suburb);
    else if (addr.quarter) parts.push(addr.quarter);

    if (parts.length === 0 && data.display_name) {
      // Fallback: take first two parts of the display name
      return data.display_name.split(',').slice(0, 2).join(',').trim();
    }

    return parts.join(', ') || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  } catch {
    return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  }
}

/**
 * Search for places by text query.
 * Bounded to the Cebu metro area for relevance.
 */
export async function searchPlaces(query: string): Promise<PlaceResult[]> {
  if (!query || query.trim().length < 2) return [];

  try {
    const data = await rateLimited(async () => {
      const params = new URLSearchParams({
        q: query,
        format: 'json',
        limit: '6',
        viewbox: CEBU_VIEWBOX,
        bounded: '1',
        addressdetails: '1',
      });
      const res = await fetch(`${NOMINATIM_BASE}/search?${params}`, {
        headers: { 'User-Agent': 'JeepMe-CebuTransit/1.0' },
      });
      if (!res.ok) throw new Error('Search failed');
      return res.json();
    });

    return data.map((item: { display_name: string; lat: string; lon: string; address?: Record<string, string> }) => {
      const addr = item.address || {};
      const shortParts: string[] = [];
      if (addr.road) shortParts.push(addr.road);
      if (addr.neighbourhood || addr.suburb) shortParts.push(addr.neighbourhood || addr.suburb);
      const shortName = shortParts.length > 0
        ? shortParts.join(', ')
        : item.display_name.split(',').slice(0, 2).join(',').trim();

      return {
        displayName: item.display_name,
        shortName,
        coordinate: { lat: parseFloat(item.lat), lng: parseFloat(item.lon) },
      };
    });
  } catch {
    return [];
  }
}
