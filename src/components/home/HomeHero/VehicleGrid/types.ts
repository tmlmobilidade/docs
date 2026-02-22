/* * */

export interface Vehicle {
	id: string
	lat: number
	lon: number
}

export interface GridPoint {
	vehicle: Vehicle
	x: number
	y: number
}

export interface Bounds {
	maxLat: number
	maxLon: number
	minLat: number
	minLon: number
}
