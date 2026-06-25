import type { MapLayers } from '@/types';
import type { MapView, TimeRange } from '@/components/Map';

const LAYER_KEYS: (keyof MapLayers)[] = [
  'conflicts',
  'bases',
  'cables',
  'pipelines',
  'hotspots',
  'ais',
  'nuclear',
  'irradiators',
  'sanctions',
  'weather',
  'economic',
  'waterways',
  'outages',
  'cyberThreats',
  'datacenters',
  'protests',
  'flights',
  'military',
  'natural',
  'spaceports',
  'minerals',
  'fires',
  'ucdpEvents',
  'displacement',
  'climate',
  'startupHubs',
  'cloudRegions',
  'accelerators',
  'techHQs',
  'techEvents',
  'tradeRoutes',
  'iranAttacks',
  'gpsJamming',
];

const TIME_RANGES: TimeRange[] = ['1h', '6h', '24h', '48h', '7d', 'all'];
const VIEW_VALUES: MapView[] = ['germany', 'global', 'america', 'mena', 'eu', 'asia', 'latam', 'africa', 'oceania'];

export interface ParsedMapUrlState {
  view?: MapView;
  zoom?: number;
  lat?: number;
  lon?: number;
  theme?: 'light' | 'dark';
  timeRange?: TimeRange;
  layers?: MapLayers;
  country?: string;
  expanded?: boolean;
}

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export function parseMapUrlState(
  search: string,
  fallbackLayers: MapLayers
): ParsedMapUrlState {
  const params = new URLSearchParams(search);

  const viewParam = params.get('view');
  const normalizedViewParam = viewParam === 'de' ? 'germany' : viewParam;
  const view = VIEW_VALUES.includes(normalizedViewParam as MapView) ? (normalizedViewParam as MapView) : undefined;

  const themeParam = params.get('theme');
  const theme = themeParam === 'light' || themeParam === 'dark' ? themeParam : undefined;

  const zoomParam = params.get('zoom');
  const zoomValue = zoomParam ? Number.parseFloat(zoomParam) : NaN;
  const zoom = Number.isFinite(zoomValue) ? clamp(zoomValue, 1, 10) : undefined;

  const latParam = params.get('lat');
  const lonParam = params.get('lon');

  let latValue = latParam ? Number.parseFloat(latParam) : NaN;
  let lonValue = lonParam ? Number.parseFloat(lonParam) : NaN;

  if (!Number.isFinite(latValue) || latValue > 85 || latValue < -85) {
    latValue = NaN;
  }

  if (!Number.isFinite(lonValue) || lonValue > 180 || lonValue < -180) {
    lonValue = NaN;
  }

  const lat = !view && Number.isFinite(latValue) ? latValue : undefined;
  const lon = !view && Number.isFinite(lonValue) ? lonValue : undefined;

  const timeRangeParam = params.get('timeRange');
  const timeRange = TIME_RANGES.includes(timeRangeParam as TimeRange)
    ? (timeRangeParam as TimeRange)
    : undefined;

  const countryParam = params.get('country');
  const country = countryParam && /^[A-Z]{2}$/i.test(countryParam.trim()) ? countryParam.trim().toUpperCase() : undefined;

  const expandedParam = params.get('expanded');
  const expanded = expandedParam === '1' ? true : undefined;

  const layersParam = params.get('layers');
  let layers: MapLayers | undefined;
  if (layersParam !== null) {
    layers = { ...fallbackLayers };
    const normalizedLayers = layersParam.trim();
    if (normalizedLayers !== '' && normalizedLayers !== 'none') {
      const requested = new Set(
        normalizedLayers
          .split(',')
          .map((layer) => layer.trim())
          .filter(Boolean)
      );
      LAYER_KEYS.forEach((key) => {
        layers![key] = requested.has(key);
      });
    } else {
      LAYER_KEYS.forEach((key) => {
        layers![key] = false;
      });
    }
  }

  return {
    view,
    zoom,
    lat,
    lon,
    theme,
    timeRange,
    layers,
    country,
    expanded,
  };
}

export function buildMapUrl(
  baseUrl: string,
  state: {
    view: MapView;
    zoom: number;
    center?: { lat: number; lon: number } | null;
    timeRange: TimeRange;
    layers: MapLayers;
    country?: string;
    expanded?: boolean;
  }
): string {
  const url = new URL(baseUrl);
  const params = new URLSearchParams();

  if (state.center) {
    params.set('lat', state.center.lat.toFixed(4));
    params.set('lon', state.center.lon.toFixed(4));
  }

  params.set('zoom', state.zoom.toFixed(2));
  params.set('view', state.view);
  params.set('timeRange', state.timeRange);

  const activeLayers = LAYER_KEYS.filter((layer) => state.layers[layer]);
  params.set('layers', activeLayers.length > 0 ? activeLayers.join(',') : 'none');

  if (state.country) {
    params.set('country', state.country);
  }

  if (state.expanded) {
    params.set('expanded', '1');
  }

  url.search = params.toString();
  return url.toString();
}
