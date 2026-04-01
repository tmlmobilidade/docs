'use client';

/* * */

import { useVehiclePositionContext } from '#/src/app/contexts/VehiclePosition.context';
import { MapOverlayVehicles, MapView } from '@/components/map';

import styles from './styles.module.css';

import { VehiclesMapHeader } from '../VehiclesMapHeader';

/* * */

export function VehiclesMap() {
	//
	// A. Setup variables
	const { data: { vehiclePositionGeoJson } } = useVehiclePositionContext();

	//
	// B. Render

	return (
		<section className={styles.container}>
			<VehiclesMapHeader />
			<div className={styles.heroContainer}>
				<div className="relative h-[clamp(300px,80vh,800px)] w-full">

					<MapView id="vehicles-map">
						<MapOverlayVehicles showCounter="always" vehiclesData={vehiclePositionGeoJson} />
					</MapView>
				</div>
			</div>
		</section>
	);
}
