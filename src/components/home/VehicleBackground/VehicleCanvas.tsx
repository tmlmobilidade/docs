'use client';

/* * */

import { useEffect, useRef } from 'react';

import { type GridPosition } from './types';
import { findClosestNeighbors } from './utils';

/* * */

interface VehicleCanvasProps {
	height: number
	positions: GridPosition[]
	width: number
}

/* * */

// Animation settings
const ANIMATION_DURATION = 1_000; // ms
const TRIANGLE_SIZE = 4;
const LINE_WIDTH = 1;
const DOT_COLOR = 'rgba(120, 170, 255, 0.3)';
const LINE_COLOR = 'rgba(120, 170, 255, 0.2)';

/* * */

interface AnimatedPosition extends GridPosition {
	startBearing: number
	startTime: number
	startX: number
	startY: number
	targetBearing: number
	targetX: number
	targetY: number
}

// Easing function for smooth animation
function easeOutCubic(t: number): number {
	return 1 - Math.pow(1 - t, 3);
}

/* * */

export function VehicleCanvas({ height, positions, width }: VehicleCanvasProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const animatedPositionsRef = useRef<Map<string, AnimatedPosition>>(new Map());
	const animationFrameRef = useRef<null | number>(null);

	// Get device pixel ratio for high DPI rendering
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;

	// Update animated positions when target positions change
	useEffect(() => {
		const now = performance.now();
		const currentAnimated = animatedPositionsRef.current;
		const newAnimated = new Map<string, AnimatedPosition>();

		for (const pos of positions) {
			const existing = currentAnimated.get(pos.id);

			if (existing) {
				// Calculate current interpolated position
				const elapsed = now - existing.startTime;
				const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
				const easedProgress = easeOutCubic(progress);

				const currentX = existing.startX + (existing.targetX - existing.startX) * easedProgress;
				const currentY = existing.startY + (existing.targetY - existing.startY) * easedProgress;
				const currentBearing = existing.startBearing + (existing.targetBearing - existing.startBearing) * easedProgress;

				// Only animate if target actually changed
				const targetChanged = existing.targetX !== pos.x || existing.targetY !== pos.y || existing.targetBearing !== pos.bearing;

				if (targetChanged) {
					newAnimated.set(pos.id, {
						bearing: currentBearing,
						id: pos.id,
						startBearing: currentBearing,
						startTime: now,
						startX: currentX,
						startY: currentY,
						targetBearing: pos.bearing,
						targetX: pos.x,
						targetY: pos.y,
						x: currentX,
						y: currentY,
					});
				} else {
					// Keep existing animation
					newAnimated.set(pos.id, existing);
				}
			} else {
				// New vehicle, start at target position (no initial animation)
				newAnimated.set(pos.id, {
					bearing: pos.bearing,
					id: pos.id,
					startBearing: pos.bearing,
					startTime: now,
					startX: pos.x,
					startY: pos.y,
					targetBearing: pos.bearing,
					targetX: pos.x,
					targetY: pos.y,
					x: pos.x,
					y: pos.y,
				});
			}
		}

		animatedPositionsRef.current = newAnimated;
	}, [positions]);

	// Setup canvas and animation loop
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		// Set canvas resolution for high DPI displays
		canvas.width = width * dpr;
		canvas.height = height * dpr;
		ctx.scale(dpr, dpr);

		// Draw function
		const draw = () => {
			const now = performance.now();
			const animated = animatedPositionsRef.current;

			// Clear canvas
			ctx.clearRect(0, 0, width, height);

			// Calculate current positions with animation
			const currentPositions: GridPosition[] = [];

			for (const [, animPos] of animated) {
				const elapsed = now - animPos.startTime;
				const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
				const easedProgress = easeOutCubic(progress);

				const x = animPos.startX + (animPos.targetX - animPos.startX) * easedProgress;
				const y = animPos.startY + (animPos.targetY - animPos.startY) * easedProgress;
				const bearing = animPos.startBearing + (animPos.targetBearing - animPos.startBearing) * easedProgress;

				currentPositions.push({ bearing, id: animPos.id, x, y });
			}

			// Find closest neighbors and draw lines
			const neighbors = findClosestNeighbors(currentPositions);
			const positionsMap = new Map(currentPositions.map(p => [p.id, p]));

			// Draw lines to closest neighbors
			ctx.strokeStyle = LINE_COLOR;
			ctx.lineWidth = LINE_WIDTH;
			ctx.beginPath();

			for (const [fromId, toId] of neighbors) {
				const from = positionsMap.get(fromId);
				const to = positionsMap.get(toId);

				if (from && to) {
					ctx.moveTo(from.x, from.y);
					ctx.lineTo(to.x, to.y);
				}
			}

			ctx.stroke();

			// Draw triangles (rotated by bearing)
			ctx.fillStyle = DOT_COLOR;

			for (const pos of currentPositions) {
				ctx.save();
				ctx.translate(pos.x, pos.y);
				// Convert bearing (degrees, 0=north, clockwise) to canvas rotation
				ctx.rotate((pos.bearing * Math.PI) / 180);

				// Draw triangle pointing up (before rotation)
				ctx.beginPath();
				ctx.moveTo(0, -TRIANGLE_SIZE); // Top point
				ctx.lineTo(-TRIANGLE_SIZE * 0.7, TRIANGLE_SIZE * 0.7); // Bottom left
				ctx.lineTo(TRIANGLE_SIZE * 0.7, TRIANGLE_SIZE * 0.7); // Bottom right
				ctx.closePath();
				ctx.fill();

				ctx.restore();
			}

			// Continue animation loop
			animationFrameRef.current = requestAnimationFrame(draw);
		};

		// Start animation loop
		animationFrameRef.current = requestAnimationFrame(draw);

		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, [width, height, dpr]);

	return (
		<canvas
			ref={canvasRef}
			style={{ display: 'block', height: `${height}px`, width: `${width}px` }}
		/>
	);
}
