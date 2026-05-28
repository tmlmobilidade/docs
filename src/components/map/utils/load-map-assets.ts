/* * */

import { type Map as MapLibreMap } from 'maplibre-gl';

/* * */

const MAP_LOAD_ASSETS = [
	{ name: 'map-pin', sdf: false, url: `/map/map-pin.png` },
	{ name: 'map-line-direction', sdf: true, url: `/map/map-line-direction.png` },
	{ name: 'map-line-direction-offset', sdf: true, url: `/map/map-line-direction-offset.png` },
	{ name: 'map-line-direction-offset-padding', sdf: true, url: `/map/map-line-direction-offset-padding.png` },
	/* * */
	{ name: 'bus-cmet-delay', sdf: false, url: `/map/bus-delay.png` },
	{ name: 'bus-cmet-regular', sdf: false, url: `/map/bus-regular.png` },
	{ name: 'bus-cmet-cut', sdf: false, url: `/map/bus-cut.png` },
	{ name: 'bus-cmet-error', sdf: false, url: `/map/bus-error.png` },
	{ name: 'bus-carris-regular', sdf: false, url: `/map/bus-carris.png` },
	{ name: 'bus-mobi-regular', sdf: false, url: `/map/bus-mobi.png` },
	{ name: 'bus-tcb-regular', sdf: false, url: `/map/bus-tcb.png` },
	/* * */
	{ name: 'boat-ttsl', sdf: false, url: `/map/boat-regular.png` },
	/* * */
	{ name: 'train-cp-regular', sdf: false, url: `/map/train-cp.png` },
	{ name: 'train-fertagus-regular', sdf: false, url: `/map/train-fertagus.png` },
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
