import { Coordinate, RouteStop, JeepneyRoute, MatchedRoute } from './types';
import { haversineDistance, findNearestPointIndex, extractSegment, polylineLength } from './geo-utils';
import { JEEPNEY_ROUTES } from './routes-data';

/**
 * Maximum distance (km) from origin/destination to a route stop.
 * Set high so routes are always returned — the UI shows "Walk to" for distant stops.
 */
const MAX_PROXIMITY_KM = 10;

/**
 * RouteService — Core route-matching engine for JeepMe.
 *
 * Uses Haversine-based proximity matching to find the best jeepney routes
 * connecting an origin to a destination in Cebu City.
 */
export class RouteService {
  private routes: JeepneyRoute[];

  constructor(routes?: JeepneyRoute[]) {
    this.routes = routes ?? JEEPNEY_ROUTES;
  }

  /**
   * Find the nearest stop on a given route to a target coordinate.
   * Returns the stop and the distance to it.
   */
  findNearestStop(
    target: Coordinate,
    route: JeepneyRoute
  ): { stop: RouteStop; distance: number } | null {
    let closest: RouteStop | null = null;
    let minDist = Infinity;

    for (const stop of route.stops) {
      const d = haversineDistance(target, stop.coordinate);
      if (d < minDist) {
        minDist = d;
        closest = stop;
      }
    }

    if (!closest || minDist > MAX_PROXIMITY_KM) return null;
    return { stop: closest, distance: minDist };
  }

  /**
   * Find all viable jeepney routes from origin to destination.
   *
   * Algorithm:
   * 1. For each route, find the nearest stop to the origin (board stop)
   * 2. Find the nearest stop to the destination (alight stop)
   * 3. Ensure the board stop comes BEFORE the alight stop on the route
   * 4. Compute the distance along the route segment
   * 5. Calculate the estimated fare
   * 6. Rank by combined proximity score (lower is better)
   */
  findRoutes(origin: Coordinate, destination: Coordinate): MatchedRoute[] {
    const matches: MatchedRoute[] = [];

    for (const route of this.routes) {
      // Find nearest stops for boarding and alighting
      const boardResult = this.findNearestStop(origin, route);
      const alightResult = this.findNearestStop(destination, route);

      // Skip if either endpoint is too far from any stop
      if (!boardResult || !alightResult) continue;

      // Ensure they are different stops
      if (boardResult.stop.name === alightResult.stop.name) continue;

      // Find the indices of these stops along the route path
      const boardPathIdx = findNearestPointIndex(boardResult.stop.coordinate, route.path);
      const alightPathIdx = findNearestPointIndex(alightResult.stop.coordinate, route.path);

      // Ensure the board stop comes before the alight stop (forward direction)
      if (boardPathIdx >= alightPathIdx) continue;

      // Extract the segment between board and alight
      const segmentPath = extractSegment(route.path, boardPathIdx, alightPathIdx);
      const totalDistance = polylineLength(segmentPath);

      // Calculate fare
      const estimatedFare = this.calculateFare(route, totalDistance);

      matches.push({
        route,
        boardAt: boardResult.stop,
        alightAt: alightResult.stop,
        boardDistance: boardResult.distance,
        alightDistance: alightResult.distance,
        totalDistance: Math.round(totalDistance * 100) / 100,
        estimatedFare,
        segmentPath,
      });
    }

    // Sort by accessibility: closest boarding point first, then total proximity as tiebreaker
    matches.sort((a, b) => {
      const boardDiff = a.boardDistance - b.boardDistance;
      // If boarding distances differ by more than 200m, prioritize closer boarding
      if (Math.abs(boardDiff) > 0.2) return boardDiff;
      // Tiebreaker: total combined proximity
      return (
        a.boardDistance + a.alightDistance - (b.boardDistance + b.alightDistance)
      );
    });

    return matches;
  }

  /**
   * Calculate the fare for a given route and distance.
   * Base fare covers baseDistanceKm, then farePerKm beyond that.
   */
  private calculateFare(route: JeepneyRoute, distanceKm: number): number {
    if (distanceKm <= route.baseDistanceKm) {
      return route.baseFare;
    }
    const extraKm = distanceKm - route.baseDistanceKm;
    const extraFare = Math.ceil(extraKm) * route.farePerKm;
    return Math.round((route.baseFare + extraFare) * 100) / 100;
  }

  /**
   * Get all available routes (for displaying on map or route list).
   */
  getAllRoutes(): JeepneyRoute[] {
    return this.routes;
  }

  /**
   * Get a specific route by its code.
   */
  getRouteByCode(code: string): JeepneyRoute | undefined {
    return this.routes.find((r) => r.code === code);
  }
}

// Singleton instance for app-wide use
export const routeService = new RouteService();
