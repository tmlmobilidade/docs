/* * */

'use client';

import { useEffect, useRef, useState } from 'react';

import styles from './styles.module.css';

import { useVehicles } from './useVehicles';
import { VehicleCanvas } from './VehicleCanvas';

/**
 * VehicleGrid component that displays a real-time visualization
 * of vehicles from the Carris Metropolitana API
 */
export function VehicleGrid() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
	const { vehicles } = useVehicles();

	// Handle responsive sizing
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const updateDimensions = () => {
			setDimensions({
				height: container.offsetHeight,
				width: container.offsetWidth,
			});
		};

		// Initial measurement
		updateDimensions();

		// Set up ResizeObserver for responsive updates
		const resizeObserver = new ResizeObserver(updateDimensions);
		resizeObserver.observe(container);

		return () => {
			resizeObserver.disconnect();
		};
	}, []);

	return (
		<div ref={containerRef} className={styles.container}>
			{dimensions.width > 0 && dimensions.height > 0 && (
				<VehicleCanvas
					height={dimensions.height}
					vehicles={vehicles}
					width={dimensions.width}
				/>
			)}
		</div>
	);
}
