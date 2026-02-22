/* * */

'use client';

import type { GridPoint, Vehicle } from './types';

import { useEffect, useRef } from 'react';

import {
	calculateBounds,
	createConnections,
	vehicleToGridPoint,
} from './utils';

const ANIMATION_DURATION_MS = 1000;

interface AnimatedPoint {
	currentX: number
	currentY: number
	targetX: number
	targetY: number
	vehicle: Vehicle
}

interface VehicleCanvasProps {
	dotColor?: string
	dotRadius?: number
	height: number
	lineColor?: string
	lineWidth?: number
	vehicles: Vehicle[]
	width: number
}

/**
 * Canvas component that renders the vehicle grid visualization
 * with smooth position animations
 */
export function VehicleCanvas({
	dotColor = 'rgba(255, 255, 255, 0.6)',
	dotRadius = 2,
	height,
	lineColor = 'rgba(255, 255, 255, 0.15)',
	lineWidth = 1,
	vehicles,
	width,
}: VehicleCanvasProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const animatedPointsRef = useRef<Map<string, AnimatedPoint>>(new Map());
	const animationFrameRef = useRef<number>(0);
	const animationStartTimeRef = useRef<number>(0);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas || vehicles.length === 0) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		// Set canvas resolution for high DPI displays
		const dpr = window.devicePixelRatio || 1;
		canvas.width = width * dpr;
		canvas.height = height * dpr;
		ctx.scale(dpr, dpr);

		// Calculate bounds and target grid points
		const bounds = calculateBounds(vehicles);
		const targetGridPoints: GridPoint[] = vehicles.map(vehicle =>
			vehicleToGridPoint(vehicle, bounds, width, height),
		);

		// Update animated points with new targets
		const currentAnimatedPoints = animatedPointsRef.current;
		const newAnimatedPoints = new Map<string, AnimatedPoint>();

		for (const targetPoint of targetGridPoints) {
			const vehicleId = targetPoint.vehicle.id;
			const existingPoint = currentAnimatedPoints.get(vehicleId);

			if (existingPoint) {
				// Update existing point with new target, keep current position for animation
				newAnimatedPoints.set(vehicleId, {
					currentX: existingPoint.currentX,
					currentY: existingPoint.currentY,
					targetX: targetPoint.x,
					targetY: targetPoint.y,
					vehicle: targetPoint.vehicle,
				});
			} else {
				// New vehicle, start at target position
				newAnimatedPoints.set(vehicleId, {
					currentX: targetPoint.x,
					currentY: targetPoint.y,
					targetX: targetPoint.x,
					targetY: targetPoint.y,
					vehicle: targetPoint.vehicle,
				});
			}
		}

		animatedPointsRef.current = newAnimatedPoints;
		animationStartTimeRef.current = performance.now();

		// Animation loop
		function animate(currentTime: number) {
			const elapsed = currentTime - animationStartTimeRef.current;
			const progress = Math.min(elapsed / ANIMATION_DURATION_MS, 1);

			// Ease out cubic for smooth deceleration
			const easeProgress = 1 - Math.pow(1 - progress, 3);

			// Clear canvas
			ctx.clearRect(0, 0, width, height);

			// Calculate interpolated positions
			const interpolatedPoints: GridPoint[] = [];

			for (const animatedPoint of animatedPointsRef.current.values()) {
				const x = animatedPoint.currentX + (animatedPoint.targetX - animatedPoint.currentX) * easeProgress;
				const y = animatedPoint.currentY + (animatedPoint.targetY - animatedPoint.currentY) * easeProgress;

				interpolatedPoints.push({
					vehicle: animatedPoint.vehicle,
					x,
					y,
				});

				// Update current position when animation completes
				if (progress >= 1) {
					animatedPoint.currentX = animatedPoint.targetX;
					animatedPoint.currentY = animatedPoint.targetY;
				}
			}

			// Create connections between interpolated points
			const connections = createConnections(interpolatedPoints);

			// Draw connections (lines)
			ctx.strokeStyle = lineColor;
			ctx.lineWidth = lineWidth;
			ctx.beginPath();

			for (const [pointA, pointB] of connections) {
				ctx.moveTo(pointA.x, pointA.y);
				ctx.lineTo(pointB.x, pointB.y);
			}

			ctx.stroke();

			// Draw dots
			ctx.fillStyle = dotColor;

			for (const point of interpolatedPoints) {
				ctx.beginPath();
				ctx.arc(point.x, point.y, dotRadius, 0, Math.PI * 2);
				ctx.fill();
			}

			// Continue animation if not complete
			if (progress < 1) {
				animationFrameRef.current = requestAnimationFrame(animate);
			}
		}

		// Start animation
		animationFrameRef.current = requestAnimationFrame(animate);

		return () => {
			cancelAnimationFrame(animationFrameRef.current);
		};
	}, [vehicles, width, height, dotRadius, dotColor, lineColor, lineWidth]);

	return (
		<canvas
			ref={canvasRef}
			style={{
				height: `${height}px`,
				width: `${width}px`,
			}}
		/>
	);
}
