/* * */

import { type Map as MapLibreMap } from 'maplibre-gl';

/* * */

interface MapLoadAsset {
	agency_ids?: number[]
	name: string
	sdf: boolean
	url: string
}

const MAP_LOAD_ASSETS: MapLoadAsset[] = [
	{ name: 'map-vehicle-ccfl-bus', sdf: false, url: '/assets/map/vehicles/map-vehicle-ccfl-bus.png' },
	{ name: 'map-vehicle-cmet-bus', sdf: false, url: '/assets/map/vehicles/map-vehicle-cmet-bus.png' },
	{ name: 'map-vehicle-unir-bus', sdf: false, url: '/assets/map/vehicles/map-vehicle-unir-bus.png' },
	{ name: 'map-vehicle-cp-train', sdf: false, url: '/assets/map/vehicles/map-vehicle-cp-train.png' },
	{ name: 'map-vehicle-fertagus-train', sdf: false, url: '/assets/map/vehicles/map-vehicle-fertagus-train.png' },
	{ name: 'map-vehicle-ml-train', sdf: false, url: '/assets/map/vehicles/map-vehicle-ml-train.png' },
	{ name: 'map-vehicle-mobi-bus', sdf: false, url: '/assets/map/vehicles/map-vehicle-mobi-bus.png' },
	{ name: 'map-vehicle-mts-tram', sdf: false, url: '/assets/map/vehicles/map-vehicle-mts-tram.png' },
	{ name: 'map-vehicle-tcb-bus', sdf: false, url: '/assets/map/vehicles/map-vehicle-tcb-bus.png' },
	{ name: 'map-vehicle-ttsl-boat', sdf: false, url: '/assets/map/vehicles/map-vehicle-ttsl-boat.png' },
];

/**
 * Loads map assets into the specified map object.
 * @param mapObject The map object to load assets into.
 */
export function loadMapAssets(mapObject: MapLibreMap | null | undefined) {
	if (!mapObject) return;
	for (const mapLoadAsset of MAP_LOAD_ASSETS) {
		mapObject.loadImage(mapLoadAsset.url).then((image) => {
			mapObject.addImage(mapLoadAsset.name, image.data, { sdf: mapLoadAsset.sdf });
		});
	}
}
