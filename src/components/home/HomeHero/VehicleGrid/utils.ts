/* * */

import type { Bounds, GridPoint, Vehicle } from './types';

/**
 * Calculates the bounding box for a set of vehicles
 */
export function calculateBounds(vehicles: Vehicle[]): Bounds {
	if (vehicles.length === 0) {
		return { maxLat: 1, maxLon: 1, minLat: 0, minLon: 0 };
	}

	return vehicles.reduce(
		(bounds, vehicle) => ({
			maxLat: Math.max(bounds.maxLat, vehicle.lat),
			maxLon: Math.max(bounds.maxLon, vehicle.lon),
			minLat: Math.min(bounds.minLat, vehicle.lat),
			minLon: Math.min(bounds.minLon, vehicle.lon),
		}),
		{
			maxLat: vehicles[0].lat,
			maxLon: vehicles[0].lon,
			minLat: vehicles[0].lat,
			minLon: vehicles[0].lon,
		},
	);
}

/**
 * Converts a vehicle's lat/lon to canvas pixel coordinates
 */
export function vehicleToGridPoint(
	vehicle: Vehicle,
	bounds: Bounds,
	width: number,
	height: number,
	padding: number = 20,
): GridPoint {
	const latRange = bounds.maxLat - bounds.minLat || 1;
	const lonRange = bounds.maxLon - bounds.minLon || 1;

	// Normalize coordinates to 0-1 range
	const normalizedLon = (vehicle.lon - bounds.minLon) / lonRange;
	const normalizedLat = (vehicle.lat - bounds.minLat) / latRange;

	// Convert to pixel coordinates (flip Y axis since lat increases northward)
	const x = padding + normalizedLon * (width - 2 * padding);
	const y = height - padding - normalizedLat * (height - 2 * padding);

	return { vehicle, x, y };
}

/**
 * Calculates Euclidean distance between two grid points
 */
export function calculateDistance(a: GridPoint, b: GridPoint): number {
	const dx = a.x - b.x;
	const dy = a.y - b.y;
	return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Finds the closest point to a given point from an array of points
 */
export function findClosestPoint(
	point: GridPoint,
	points: GridPoint[],
): GridPoint | null {
	let closest: GridPoint | null = null;
	let minDistance = Infinity;

	for (const other of points) {
		if (other.vehicle.id === point.vehicle.id) continue;

		const distance = calculateDistance(point, other);
		if (distance < minDistance) {
			minDistance = distance;
			closest = other;
		}
	}

	return closest;
}

/**
 * Creates connections between each point and its closest neighbor
 */
export function createConnections(
	points: GridPoint[],
): Array<[GridPoint, GridPoint]> {
	const connections: Array<[GridPoint, GridPoint]> = [];
	const connectedPairs = new Set<string>();

	for (const point of points) {
		const closest = findClosestPoint(point, points);
		if (!closest) continue;

		// Create a unique key for this pair (sorted to prevent duplicates)
		const ids = [point.vehicle.id, closest.vehicle.id].sort();
		const pairKey = `${ids[0]}-${ids[1]}`;

		if (!connectedPairs.has(pairKey)) {
			connectedPairs.add(pairKey);
			connections.push([point, closest]);
		}
	}

	return connections;
}
