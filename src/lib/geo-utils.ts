import { Coordinate } from './types';

/**
 * Compute the Haversine distance between two coordinates.
 * Returns distance in kilometers.
 */
export function haversineDistance(a: Coordinate, b: Coordinate): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);

  const sinHalfLat = Math.sin(dLat / 2);
  const sinHalfLng = Math.sin(dLng / 2);

  const h =
    sinHalfLat * sinHalfLat +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * sinHalfLng * sinHalfLng;

  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Find the index of the nearest point on a path to a target coordinate.
 */
export function findNearestPointIndex(
  target: Coordinate,
  path: Coordinate[]
): number {
  let minDist = Infinity;
  let minIdx = 0;

  for (let i = 0; i < path.length; i++) {
    const d = haversineDistance(target, path[i]);
    if (d < minDist) {
      minDist = d;
      minIdx = i;
    }
  }

  return minIdx;
}

/**
 * Extract a segment of a polyline path between two indices (inclusive).
 * Handles forward direction only (startIdx < endIdx).
 */
export function extractSegment(
  path: Coordinate[],
  startIdx: number,
  endIdx: number
): Coordinate[] {
  if (startIdx <= endIdx) {
    return path.slice(startIdx, endIdx + 1);
  }
  // If reversed direction, return reversed segment
  return path.slice(endIdx, startIdx + 1).reverse();
}

/**
 * Calculate the total length of a polyline segment in km.
 */
export function polylineLength(path: Coordinate[]): number {
  let total = 0;
  for (let i = 1; i < path.length; i++) {
    total += haversineDistance(path[i - 1], path[i]);
  }
  return total;
}

/**
 * Find the center point of a bounding box defined by coordinates.
 */
export function getBoundsCenter(coords: Coordinate[]): Coordinate {
  if (coords.length === 0) return { lat: 10.3157, lng: 123.8854 }; // Cebu default

  const lats = coords.map((c) => c.lat);
  const lngs = coords.map((c) => c.lng);

  return {
    lat: (Math.min(...lats) + Math.max(...lats)) / 2,
    lng: (Math.min(...lngs) + Math.max(...lngs)) / 2,
  };
}
