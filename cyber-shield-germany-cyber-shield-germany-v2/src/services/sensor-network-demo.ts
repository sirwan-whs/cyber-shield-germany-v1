export interface SensorNetworkEntry {
  id: string;
  name: string;
  region: string;
  sensorType: string;
  status: 'online' | 'offline';
  lastEvent: string;
  risk: 'Low' | 'Medium' | 'High' | 'Critical';
  attackCount: number;
  lastSeen: string;
}

export function getDemoSensorNetwork(): SensorNetworkEntry[] {
  return [
    {
      id: 'berlin-01',
      name: 'Sensor Berlin',
      region: 'Berlin',
      sensorType: 'SSH Honeypot',
      status: 'online',
      lastEvent: 'SSH brute-force attempt',
      risk: 'High',
      attackCount: 24,
      lastSeen: '2 min ago',
    },
    {
      id: 'frankfurt-01',
      name: 'Sensor Frankfurt',
      region: 'Frankfurt',
      sensorType: 'HTTP Trap',
      status: 'online',
      lastEvent: 'Web probe detected',
      risk: 'Medium',
      attackCount: 11,
      lastSeen: '8 min ago',
    },
    {
      id: 'munich-01',
      name: 'Sensor München',
      region: 'München',
      sensorType: 'SSH Honeypot',
      status: 'offline',
      lastEvent: 'Heartbeat missed',
      risk: 'Low',
      attackCount: 3,
      lastSeen: '18 min ago',
    },
    {
      id: 'hamburg-01',
      name: 'Sensor Hamburg',
      region: 'Hamburg',
      sensorType: 'TLS Canary',
      status: 'online',
      lastEvent: 'TLS handshake anomaly',
      risk: 'Critical',
      attackCount: 37,
      lastSeen: '1 min ago',
    },
  ];
}
