'use client';

/* * */

import type { Vehicle } from './types';

import useSWR from 'swr';

/* * */

const VEHICLES_API_URL = 'https://api.carrismetropolitana.pt/v2/vehicles';

const fetcher = (url: string): Promise<Vehicle[]> =>
	fetch(url).then(res => res.json());

/* * */

export function useVehicles() {
	const { data, error, isLoading } = useSWR<Vehicle[]>(
		VEHICLES_API_URL,
		fetcher,
		{
			refreshInterval: 5_000, // Refresh every 5 seconds
		},
	);

	return {
		isError: !!error,
		isLoading,
		vehicles: data || [],
	};
}
