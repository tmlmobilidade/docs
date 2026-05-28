/* * */

import { type DataDrivenPropertyValueSpecification, type Map as MapLibreMap } from 'maplibre-gl';

/* * */

interface VehicleIconSize {
	zoom10: number
	zoom20: number
}

interface MapLoadAsset {
	agency_ids?: number[]
	name: string
	sdf: boolean
	url: string
	vehicleIconSize?: VehicleIconSize
}

const DEFAULT_VEHICLE_ICON_SIZE: VehicleIconSize = { zoom10: 0.05, zoom20: 0.15 };

const MAP_LOAD_ASSETS: MapLoadAsset[] = [
	{ name: 'map-pin', sdf: false, url: `/map/map-pin.png` },
	{ name: 'map-line-direction', sdf: true, url: `/map/map-line-direction.png` },
	{ name: 'map-line-direction-offset', sdf: true, url: `/map/map-line-direction-offset.png` },
	{ name: 'map-line-direction-offset-padding', sdf: true, url: `/map/map-line-direction-offset-padding.png` },
	/* * */
	{ agency_ids: [41, 42, 43, 44], name: 'bus-cmet-delay', sdf: false, url: `/map/bus-delay.png` },
	{ agency_ids: [41, 42, 43, 44], name: 'bus-cmet-regular', sdf: false, url: `/map/bus-regular.png` },
	{ agency_ids: [41, 42, 43, 44], name: 'bus-cmet-cut', sdf: false, url: `/map/bus-cut.png` },
	{ agency_ids: [41, 42, 43, 44], name: 'bus-cmet-error', sdf: false, url: `/map/bus-error.png` },
	{ agency_ids: [1], name: 'bus-carris-regular', sdf: false, url: `/map/bus-carris.png`, vehicleIconSize: { zoom10: 0.0475, zoom20: 0.1425 } },
	{ agency_ids: [21], name: 'bus-mobi-regular', sdf: false, url: `/map/bus-mobi.png`, vehicleIconSize: { zoom10: 0.0475, zoom20: 0.1425 } },
	{ agency_ids: [8], name: 'bus-tcb-regular', sdf: false, url: `/map/bus-tcb.png` },
	/* * */
	{ agency_ids: [4], name: 'boat-ttsl', sdf: false, url: `/map/boat-regular.png` },
	/* * */
	{ agency_ids: [3], name: 'train-cp-regular', sdf: false, url: `/map/train-cp.png` },
	{ agency_ids: [15], name: 'train-fertagus-regular', sdf: false, url: `/map/train-fertagus.png` },
];

const VEHICLE_REGULAR_ICON_ASSETS = MAP_LOAD_ASSETS.filter(
	(asset): asset is MapLoadAsset & { agency_ids: number[] } =>
		asset.agency_ids != null && !asset.name.endsWith('-delay') && !asset.name.endsWith('-cut') && !asset.name.endsWith('-error'),
);

const VEHICLE_DELAY_ICON = MAP_LOAD_ASSETS.find(asset => asset.name.endsWith('-delay'))?.name ?? 'bus-cmet-delay';

const VEHICLE_DEFAULT_ICON = VEHICLE_REGULAR_ICON_ASSETS.find(asset => asset.name === 'bus-cmet-regular')?.name ?? 'bus-cmet-regular';

const AGENCY_ID_INPUT = ['to-string', ['get', 'agency_id']];

function buildAgencyMatch<T extends number | string>(
	entries: ReadonlyArray<{ agencyIds: readonly number[], value: T }>,
	defaultValue: T,
) {
	const cases: (number | string | T)[] = [];
	for (const { agencyIds, value } of entries) {
		for (const agencyId of agencyIds) {
			cases.push(String(agencyId), value);
		}
	}
	return ['match', AGENCY_ID_INPUT, ...cases, defaultValue];
}

const vehicleIconImageCases = VEHICLE_REGULAR_ICON_ASSETS.map(asset => ({
	agencyIds: asset.agency_ids,
	value: asset.name,
}));

function vehicleIconSizeCasesAtZoom(zoomKey: keyof VehicleIconSize) {
	return VEHICLE_REGULAR_ICON_ASSETS.map(asset => ({
		agencyIds: asset.agency_ids,
		value: asset.vehicleIconSize?.[zoomKey] ?? DEFAULT_VEHICLE_ICON_SIZE[zoomKey],
	}));
}

/** Mapbox `icon-image` expression for the vehicles regular layer. */
export const vehicleIconImage = buildAgencyMatch(vehicleIconImageCases, VEHICLE_DEFAULT_ICON) as DataDrivenPropertyValueSpecification<string>;

/** Mapbox `icon-image` for the vehicles delay layer. */
export const vehicleDelayIconImage = VEHICLE_DELAY_ICON;

/** Mapbox `icon-size` expression for the vehicles regular layer. */
export const vehicleIconSize = [
	'interpolate',
	['linear'],
	['zoom'],
	10,
	buildAgencyMatch(vehicleIconSizeCasesAtZoom('zoom10'), DEFAULT_VEHICLE_ICON_SIZE.zoom10),
	20,
	buildAgencyMatch(vehicleIconSizeCasesAtZoom('zoom20'), DEFAULT_VEHICLE_ICON_SIZE.zoom20),
] as unknown as DataDrivenPropertyValueSpecification<number>;

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
