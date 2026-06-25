export const DEMO_CYBER_ATTACKS_ENABLED = true;

export interface DemoSensorTarget {
  sensor_id: string;
  sensor_name: string;
  sensor_type: string;
  city: string;
  region: string;
  position: [number, number];
}

export interface DemoCyberAttackEvent {
  id: string;
  timestampOffsetMs: number;
  sensor_id: string;
  sensor_type: string;
  protocol: 'ssh' | 'https' | 'rdp' | 'smtp';
  src_ip: string;
  source_city: string;
  source_country: string;
  source_position: [number, number];
  event_action: string;
  event_family: string;
  severity: number;
  raw: Record<string, unknown>;
}

export interface DemoCyberAttack extends DemoCyberAttackEvent {
  activatedAt: number;
  target: DemoSensorTarget;
  sourceName: string;
  targetName: string;
  sourcePosition: [number, number];
  targetPosition: [number, number];
}

export const DEMO_SENSOR_TARGETS: DemoSensorTarget[] = [
  { sensor_id: 'sensor-berlin', sensor_name: 'Sensor Berlin', sensor_type: 'honeypot', city: 'Berlin', region: 'Berlin', position: [13.405, 52.52] },
  { sensor_id: 'sensor-frankfurt', sensor_name: 'Sensor Frankfurt', sensor_type: 'honeypot', city: 'Frankfurt', region: 'Hesse', position: [8.6821, 50.1109] },
  { sensor_id: 'sensor-munich', sensor_name: 'Sensor Munich', sensor_type: 'honeypot', city: 'Munich', region: 'Bavaria', position: [11.582, 48.1351] },
  { sensor_id: 'sensor-hamburg', sensor_name: 'Sensor Hamburg', sensor_type: 'honeypot', city: 'Hamburg', region: 'Hamburg', position: [9.9937, 53.5511] },
];

const targetById = new Map(DEMO_SENSOR_TARGETS.map((target) => [target.sensor_id, target]));

export const DEMO_CYBER_ATTACK_EVENTS: DemoCyberAttackEvent[] = [
  { id: 'demo-001', timestampOffsetMs: 0, sensor_id: 'sensor-frankfurt', sensor_type: 'honeypot', protocol: 'ssh', src_ip: '185.220.101.42', source_city: 'London', source_country: 'United Kingdom', source_position: [-0.1276, 51.5072], event_action: 'login attempt', event_family: 'brute force', severity: 0.82, raw: { username: 'root', attempts: 42 } },
  { id: 'demo-002', timestampOffsetMs: 8_000, sensor_id: 'sensor-berlin', sensor_type: 'honeypot', protocol: 'ssh', src_ip: '91.203.5.77', source_city: 'Helsinki', source_country: 'Finland', source_position: [24.9384, 60.1699], event_action: 'credential stuffing', event_family: 'brute force', severity: 0.58, raw: { username: 'admin', attempts: 18 } },
  { id: 'demo-003', timestampOffsetMs: 16_000, sensor_id: 'sensor-munich', sensor_type: 'honeypot', protocol: 'https', src_ip: '45.83.64.120', source_city: 'Madrid', source_country: 'Spain', source_position: [-3.7038, 40.4168], event_action: 'path scan', event_family: 'reconnaissance', severity: 0.34, raw: { path: '/wp-admin' } },
  { id: 'demo-004', timestampOffsetMs: 24_000, sensor_id: 'sensor-munich', sensor_type: 'honeypot', protocol: 'ssh', src_ip: '193.32.162.19', source_city: 'Hamburg', source_country: 'Germany', source_position: [9.9937, 53.5511], event_action: 'login attempt', event_family: 'brute force', severity: 0.72, raw: { username: 'ubuntu', attempts: 31 } },
  { id: 'demo-005', timestampOffsetMs: 32_000, sensor_id: 'sensor-berlin', sensor_type: 'honeypot', protocol: 'rdp', src_ip: '102.129.143.88', source_city: 'Paris', source_country: 'France', source_position: [2.3522, 48.8566], event_action: 'session probe', event_family: 'scan', severity: 0.46, raw: { port: 3389 } },
  { id: 'demo-006', timestampOffsetMs: 40_000, sensor_id: 'sensor-hamburg', sensor_type: 'honeypot', protocol: 'ssh', src_ip: '154.21.31.5', source_city: 'Warsaw', source_country: 'Poland', source_position: [21.0122, 52.2297], event_action: 'password spray', event_family: 'brute force', severity: 0.63, raw: { attempts: 25 } },
  { id: 'demo-007', timestampOffsetMs: 48_000, sensor_id: 'sensor-frankfurt', sensor_type: 'honeypot', protocol: 'https', src_ip: '31.13.191.28', source_city: 'Amsterdam', source_country: 'Netherlands', source_position: [4.9041, 52.3676], event_action: 'exploit probe', event_family: 'web scan', severity: 0.67, raw: { cve: 'CVE-demo' } },
  { id: 'demo-008', timestampOffsetMs: 56_000, sensor_id: 'sensor-berlin', sensor_type: 'honeypot', protocol: 'ssh', src_ip: '89.248.165.14', source_city: 'Frankfurt', source_country: 'Germany', source_position: [8.6821, 50.1109], event_action: 'login attempt', event_family: 'brute force', severity: 0.76, raw: { username: 'postgres', attempts: 36 } },
  { id: 'demo-009', timestampOffsetMs: 4_000, sensor_id: 'sensor-munich', sensor_type: 'honeypot', protocol: 'smtp', src_ip: '190.2.146.91', source_city: 'Milan', source_country: 'Italy', source_position: [9.19, 45.4642], event_action: 'relay probe', event_family: 'spam infrastructure', severity: 0.39, raw: { port: 25 } },
  { id: 'demo-010', timestampOffsetMs: 12_000, sensor_id: 'sensor-hamburg', sensor_type: 'honeypot', protocol: 'https', src_ip: '103.253.73.44', source_city: 'Prague', source_country: 'Czechia', source_position: [14.4378, 50.0755], event_action: 'directory scan', event_family: 'reconnaissance', severity: 0.41, raw: { paths: 12 } },
  { id: 'demo-011', timestampOffsetMs: 20_000, sensor_id: 'sensor-frankfurt', sensor_type: 'honeypot', protocol: 'ssh', src_ip: '77.247.126.12', source_city: 'Zurich', source_country: 'Switzerland', source_position: [8.5417, 47.3769], event_action: 'key exchange probe', event_family: 'scan', severity: 0.28, raw: { client: 'libssh' } },
  { id: 'demo-012', timestampOffsetMs: 28_000, sensor_id: 'sensor-munich', sensor_type: 'honeypot', protocol: 'rdp', src_ip: '146.70.81.21', source_city: 'Vienna', source_country: 'Austria', source_position: [16.3738, 48.2082], event_action: 'session probe', event_family: 'scan', severity: 0.49, raw: { port: 3389 } },
  { id: 'demo-013', timestampOffsetMs: 36_000, sensor_id: 'sensor-berlin', sensor_type: 'honeypot', protocol: 'ssh', src_ip: '185.181.61.38', source_city: 'Copenhagen', source_country: 'Denmark', source_position: [12.5683, 55.6761], event_action: 'login attempt', event_family: 'brute force', severity: 0.62, raw: { username: 'oracle', attempts: 22 } },
  { id: 'demo-014', timestampOffsetMs: 44_000, sensor_id: 'sensor-hamburg', sensor_type: 'honeypot', protocol: 'https', src_ip: '167.94.138.44', source_city: 'Brussels', source_country: 'Belgium', source_position: [4.3517, 50.8503], event_action: 'banner grab', event_family: 'reconnaissance', severity: 0.31, raw: { userAgent: 'demo-scanner' } },
  { id: 'demo-015', timestampOffsetMs: 52_000, sensor_id: 'sensor-frankfurt', sensor_type: 'honeypot', protocol: 'ssh', src_ip: '195.54.160.33', source_city: 'Stockholm', source_country: 'Sweden', source_position: [18.0686, 59.3293], event_action: 'password spray', event_family: 'brute force', severity: 0.69, raw: { attempts: 29 } },
  { id: 'demo-016', timestampOffsetMs: 2_000, sensor_id: 'sensor-munich', sensor_type: 'honeypot', protocol: 'ssh', src_ip: '185.176.27.2', source_city: 'Berlin', source_country: 'Germany', source_position: [13.405, 52.52], event_action: 'login attempt', event_family: 'brute force', severity: 0.74, raw: { username: 'deploy', attempts: 34 } },
  { id: 'demo-017', timestampOffsetMs: 10_000, sensor_id: 'sensor-hamburg', sensor_type: 'honeypot', protocol: 'https', src_ip: '64.62.197.22', source_city: 'Dublin', source_country: 'Ireland', source_position: [-6.2603, 53.3498], event_action: 'vulnerability scan', event_family: 'web scan', severity: 0.52, raw: { paths: 44 } },
  { id: 'demo-018', timestampOffsetMs: 18_000, sensor_id: 'sensor-berlin', sensor_type: 'honeypot', protocol: 'smtp', src_ip: '141.98.11.16', source_city: 'Oslo', source_country: 'Norway', source_position: [10.7522, 59.9139], event_action: 'relay probe', event_family: 'spam infrastructure', severity: 0.36, raw: { port: 25 } },
  { id: 'demo-019', timestampOffsetMs: 26_000, sensor_id: 'sensor-frankfurt', sensor_type: 'honeypot', protocol: 'rdp', src_ip: '87.236.176.54', source_city: 'Lisbon', source_country: 'Portugal', source_position: [-9.1393, 38.7223], event_action: 'session probe', event_family: 'scan', severity: 0.44, raw: { port: 3389 } },
  { id: 'demo-020', timestampOffsetMs: 34_000, sensor_id: 'sensor-berlin', sensor_type: 'honeypot', protocol: 'ssh', src_ip: '193.142.146.47', source_city: 'Munich', source_country: 'Germany', source_position: [11.582, 48.1351], event_action: 'login attempt', event_family: 'brute force', severity: 0.71, raw: { username: 'test', attempts: 33 } },
];

export function sensorEventToDemoCyberAttack(event: DemoCyberAttackEvent, activatedAt: number): DemoCyberAttack | null {
  const target = targetById.get(event.sensor_id);
  if (!target) return null;
  return {
    ...event,
    activatedAt,
    target,
    sourceName: `${event.source_city}, ${event.source_country}`,
    targetName: target.sensor_name,
    sourcePosition: event.source_position,
    targetPosition: target.position,
  };
}

export function getActiveDemoCyberAttackEvents(now = Date.now()): DemoCyberAttack[] {
  if (!DEMO_CYBER_ATTACKS_ENABLED) return [];
  const bucket = Math.floor(now / 60_000);
  const activeCount = bucket % 2 === 0 ? 5 : 4;
  const start = (bucket * 3) % DEMO_CYBER_ATTACK_EVENTS.length;
  const bucketStart = bucket * 60_000;

  return Array.from({ length: activeCount }, (_, index) => {
    const event = DEMO_CYBER_ATTACK_EVENTS[(start + index) % DEMO_CYBER_ATTACK_EVENTS.length]!;
    return sensorEventToDemoCyberAttack(event, bucketStart + event.timestampOffsetMs);
  }).filter((event): event is DemoCyberAttack => event !== null);
}
