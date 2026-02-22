/* * */

'use client';

import type { Vehicle } from './types';

import { useCallback, useEffect, useRef, useState } from 'react';

const VEHICLES_API_URL = 'https://api.carrismetropolitana.pt/vehicles';
const POLLING_INTERVAL_MS = 1000;

interface UseVehiclesReturn {
	error: Error | null
	isLoading: boolean
	vehicles: Vehicle[]
}

/**
 * Custom hook to fetch vehicle data from the Carris Metropolitana API
 * Auto-updates every second
 */
export function useVehicles(): UseVehiclesReturn {
	const [vehicles, setVehicles] = useState<Vehicle[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const isMountedRef = useRef(true);

	const fetchVehicles = useCallback(async () => {
		try {
			const response = await fetch(VEHICLES_API_URL);

			if (!response.ok) {
				throw new Error(`Failed to fetch vehicles: ${response.status}`);
			}

			const data = await response.json();

			if (!isMountedRef.current) return;

			// Extract only the fields we need
			const processedVehicles: Vehicle[] = data
				.filter((v: { lat?: number, lon?: number }) =>
					typeof v.lat === 'number' && typeof v.lon === 'number')
				.map((v: { id: string, lat: number, lon: number }) => ({
					id: v.id,
					lat: v.lat,
					lon: v.lon,
				}));

			setVehicles(processedVehicles);
			setError(null);
		} catch (err) {
			if (!isMountedRef.current) return;
			setError(err instanceof Error ? err : new Error('Unknown error'));
		} finally {
			if (isMountedRef.current) {
				setIsLoading(false);
			}
		}
	}, []);

	useEffect(() => {
		isMountedRef.current = true;

		// Initial fetch
		void fetchVehicles();

		// Set up polling interval
		const intervalId = setInterval(() => {
			void fetchVehicles();
		}, POLLING_INTERVAL_MS);

		return () => {
			isMountedRef.current = false;
			clearInterval(intervalId);
		};
	}, [fetchVehicles]);

	return { error, isLoading, vehicles };
}
