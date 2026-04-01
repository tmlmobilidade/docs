'use client';

/* * */

import { getBaseGeoJsonFeatureCollection, transformVehicleDataIntoGeoJsonFeature } from '@tmlmobilidade/geo';
import { SimplifiedVehicleEvent, Vehicle } from '@tmlmobilidade/types';
import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import useSWR from 'swr';

interface VehiclePositionContextState {
	data: {
		vehiclePositionGeoJson: GeoJSON.FeatureCollection<GeoJSON.Point> | undefined
	}
	flags: {
		error: Error | undefined
		loading: boolean
	}
}

/* * */

const VehiclePositionContext = createContext<undefined | VehiclePositionContextState>(undefined);

export function useVehiclePositionContext() {
	const context = useContext(VehiclePositionContext);
	if (!context) {
		throw new Error('useVehiclePositionContext must be used within a VehiclePositionContextProvider');
	}
	return context;
}

/* * */

export const VehiclePositionContextProvider = ({ children }: PropsWithChildren) => {
	const { data: vehicleData } = useSWR<Vehicle[], Error>('https://go.tmlmobilidade.pt/fleet/api/vehicles', { refreshInterval: 5000 });
	const { data: fetchedVehiclePositionData, error, isLoading } = useSWR<SimplifiedVehicleEvent[], Error>('https://go.tmlmobilidade.pt/fleet/api/vehicles/positions', { refreshInterval: 5000 });

	const vehiclesGeoJsonFeatureCollection: GeoJSON.FeatureCollection<GeoJSON.Point, GeoJSON.GeoJsonProperties> | undefined = useMemo(() => {
		//
		// Initialize the GeoJSON feature collection
		const collection = getBaseGeoJsonFeatureCollection<GeoJSON.Point, GeoJSON.GeoJsonProperties>();

		//
		// Transform vehicle position data into GeoJSON feature collection
		fetchedVehiclePositionData?.forEach(vehicle =>
			collection.features.push(
				transformVehicleDataIntoGeoJsonFeature(
					vehicle,
					vehicleData?.find(v => v._id === vehicle.vehicle_id && v.agency_id === vehicle.agency_id),
				),
			),
		);

		// Return the GeoJSON feature collection
		return collection;
	}, [fetchedVehiclePositionData, vehicleData]);

	const contextValue: VehiclePositionContextState = useMemo(() => {
		return {
			data: {
				vehiclePositionGeoJson: vehiclesGeoJsonFeatureCollection,
			},
			flags: {
				error,
				loading: isLoading,
			},
		};
	}, [vehiclesGeoJsonFeatureCollection, error, isLoading]);

	return (
		<VehiclePositionContext.Provider value={contextValue}>
			{children}
		</VehiclePositionContext.Provider>
	);
};
