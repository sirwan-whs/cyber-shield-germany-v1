// Cyber Shield Deutschland variant

import type { PanelConfig, MapLayers } from '@/types';

import type { VariantConfig } from './base';



export * from './base';



// Minimal Cyber / Live feeds

import type { Feed } from '@/types';



const rss = (url: string) => `/api/rss-proxy?url=${encodeURIComponent(url)}`;



export const FEEDS: Record<string, Feed[]> = {

  security: [

    { name: 'CISA Advisories', url: rss('https://www.cisa.gov/cybersecurity-advisories/all.xml') },

    { name: 'BSI Deutschland', url: rss('https://www.bsi.bund.de/SiteGlobals/Functions/RSSFeed/RSSFeed.xml') },

    { name: 'The Hacker News', url: rss('https://feeds.feedburner.com/TheHackersNews') },

    { name: 'Krebs Security', url: rss('https://krebsonsecurity.com/feed/') },

    { name: 'Ransomware.live', url: rss('https://www.ransomware.live/rss.xml') },

  ],



  live: [

    { name: 'Cyber Attacks Live', url: rss('https://news.google.com/rss/search?q=cyber+attack+OR+ransomware+when:1d&hl=de&gl=DE&ceid=DE:de') },

  ],

};


export const DEFAULT_PANELS: Record<string, PanelConfig> = {

  map: { name: 'Cyber Shield Map (DE)', enabled: true, priority: 1 },

  'live-news': { name: 'Live Cyber News', enabled: false, priority: 1 },

  security: { name: 'Security Advisories', enabled: true, priority: 1 },

  outages: { name: 'Network Outages', enabled: true, priority: 1 },

  monitors: { name: 'Sensor Monitor', enabled: true, priority: 1 },

  'sensor-network': { name: 'Sensor Network Status', enabled: true, priority: 1 },

  'telegram-intel': { name: 'Telegram Intel', enabled: true, priority: 2 },
  
  'cyber-map': { name: 'Live Cyber Map', enabled: true, priority: 2 },
  'cyber-intel': { name: 'Cyber Intelligence', enabled: true, priority: 1},

};


export const DEFAULT_MAP_LAYERS: MapLayers = {

  gpsJamming: false,

  conflicts: false,

  bases: false,

  cables: true,

  pipelines: false,

  hotspots: false,

  ais: false,

  nuclear: false,

  irradiators: false,

  sanctions: false,

  weather: false,

  economic: false,

  waterways: false,

  outages: true,

  cyberThreats: true,

  datacenters: true,

  protests: false,

  flights: false,

  military: false,

  natural: false,

  spaceports: false,

  minerals: false,

  fires: false,

  ucdpEvents: false,

  displacement: false,

  climate: false,

  startupHubs: false,

  cloudRegions: true,

  accelerators: false,

  techHQs: false,

  techEvents: false,

  stockExchanges: false,

  financialCenters: false,

  centralBanks: false,

  commodityHubs: false,

  gulfInvestments: false,

  positiveEvents: false,

  kindness: false,

  happiness: false,

  speciesRecovery: false,

  renewableInstallations: false,

  tradeRoutes: false,

  iranAttacks: false,

  dayNight: false,

};



export const VARIANT_CONFIG: VariantConfig = {

  name: 'cyber-de',

  description: 'Cyber Shield Deutschland – Cyber & Network Intelligence',

  panels: DEFAULT_PANELS,

  mapLayers: DEFAULT_MAP_LAYERS,

  mobileMapLayers: DEFAULT_MAP_LAYERS,

};



