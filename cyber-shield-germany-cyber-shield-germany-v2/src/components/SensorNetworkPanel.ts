import { Panel } from './Panel';
import { getDemoSensorNetwork, type SensorNetworkEntry } from '@/services/sensor-network-demo';
import { escapeHtml } from '@/utils/sanitize';

function getRiskColor(risk: SensorNetworkEntry['risk']): string {
  switch (risk) {
    case 'Critical':
      return '#f43f5e';
    case 'High':
      return '#fb923c';
    case 'Medium':
      return '#facc15';
    default:
      return '#34d399';
  }
}

function renderSensorRow(sensor: SensorNetworkEntry): string {
  return `
    <div style="display:grid;grid-template-columns:1.2fr 0.9fr 0.8fr 0.75fr 0.8fr 0.7fr;gap:8px;align-items:center;padding:8px 0;border-top:1px solid rgba(148,163,184,0.16);font-size:12px;">
      <div>
        <div style="font-weight:700;color:#e2f8ee;">${escapeHtml(sensor.name)}</div>
        <div style="font-size:11px;color:#94a3b8;">${escapeHtml(sensor.region)} • ${escapeHtml(sensor.sensorType)}</div>
      </div>
      <div style="color:#cbd5e1;">${escapeHtml(sensor.lastEvent)}</div>
      <div style="color:${sensor.status === 'online' ? '#4ade80' : '#f87171'};font-weight:700;">${escapeHtml(sensor.status === 'online' ? 'online' : 'offline')}</div>
      <div style="color:#f8fafc;font-weight:700;">${escapeHtml(sensor.risk)}</div>
      <div style="color:#cbd5e1;">${escapeHtml(String(sensor.attackCount))}</div>
      <div>
        <span style="display:inline-block;padding:2px 6px;border-radius:999px;background:${getRiskColor(sensor.risk)}22;color:${getRiskColor(sensor.risk)};font-weight:700;font-size:10px;">${escapeHtml(sensor.lastSeen)}</span>
      </div>
    </div>
  `;
}

export class SensorNetworkPanel extends Panel {
  constructor() {
    super({
      id: 'sensor-network',
      title: 'Sensor Network Status',
      className: 'panel-wide',
      showCount: false,
    });

    const contentEl = document.createElement('div');
    contentEl.style.padding = '10px';
    contentEl.style.display = 'grid';
    contentEl.style.gap = '10px';

    const sensors = getDemoSensorNetwork();
    const rows = sensors.map(renderSensorRow).join('');

    contentEl.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
        <div style="font-size:12px;color:#d1fae5;font-weight:700;">Deutschland-Sensoren</div>
        <div style="font-size:11px;color:#86efac;">Demo-Daten • später ersetzbar durch echte Sensordaten</div>
      </div>
      <div style="display:grid;grid-template-columns:1.2fr 0.9fr 0.8fr 0.75fr 0.7fr 0.8fr;gap:8px;padding:0 0 4px;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.04em;">
        <div>Sensor</div>
        <div>Letztes Event</div>
        <div>Status</div>
        <div>Risiko</div>
        <div>Angriffe</div>
        <div>Aktuell</div>
      </div>
      <div>${rows}</div>
    `;

    this.content.replaceChildren(contentEl);
  }
}
