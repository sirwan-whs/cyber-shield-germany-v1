import {
  DEMO_CYBER_ATTACKS_ENABLED,
  getActiveDemoCyberAttackEvents,
  type DemoCyberAttack,
} from '@/services/demo-cyber-attacks';
import { Panel } from './Panel';
import { escapeHtml } from '@/utils/sanitize';

function formatAttackTime(timestamp: number): string {
  return new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(timestamp));
}

function renderAttackRow(attack: DemoCyberAttack): string {
  const source = `${attack.source_city}, ${attack.source_country}`;
  const action = `${attack.event_action} / ${attack.event_family}`;

  return `
    <div style="display:grid;grid-template-columns:64px 1fr auto;gap:8px;align-items:start;padding:8px 0;border-top:1px solid rgba(148,163,184,0.18);">
      <div style="font-size:11px;color:#94a3b8;font-variant-numeric:tabular-nums;">${escapeHtml(formatAttackTime(attack.activatedAt))}</div>
      <div style="min-width:0;">
        <div style="font-size:12px;color:#e5f8ef;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(source)} &rarr; ${escapeHtml(attack.targetName)}</div>
        <div style="font-size:11px;color:#94a3b8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(attack.src_ip)} &middot; ${escapeHtml(attack.target.city)}, ${escapeHtml(attack.target.region)}</div>
        <div style="font-size:11px;color:#9ca3af;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(action)}</div>
      </div>
      <div style="font-size:10px;letter-spacing:0;text-transform:uppercase;color:#03110a;background:#22c55e;border:1px solid rgba(187,247,208,0.75);border-radius:4px;padding:2px 5px;font-weight:700;">${escapeHtml(attack.protocol)}</div>
    </div>
  `;
}

export class CyberIntelPanel extends Panel {
  private contentEl!: HTMLElement;
  private intervalId: ReturnType<typeof setInterval> | null = null;

  constructor(_getNews?: () => unknown[]) {
    super({
      id: 'cyber-intel',
      title: 'Cyber Intelligence',
      className: 'panel-wide',
    });

    this.contentEl = document.createElement('div');
    this.contentEl.style.padding = '10px';
    this.content.replaceChildren(this.contentEl);

    this.renderContent();
    this.intervalId = setInterval(() => this.renderContent(), 5000);
  }

  private renderContent(): void {
    if (!this.contentEl) return;

    if (!DEMO_CYBER_ATTACKS_ENABLED) {
      this.contentEl.innerHTML = '<div style="color:#94a3b8;font-size:12px;">Demo attack feed disabled.</div>';
      return;
    }

    const attacks = getActiveDemoCyberAttackEvents(Date.now());
    const rows = attacks.map(renderAttackRow).join('');

    this.contentEl.innerHTML = `
      <div style="display:grid;gap:8px;">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
          <div style="font-size:12px;color:#d1fae5;font-weight:700;">Live Attack Feed</div>
          <div style="font-size:11px;color:#86efac;font-variant-numeric:tabular-nums;">${attacks.length} active</div>
        </div>
        <div style="font-size:11px;color:#94a3b8;">Demo sensor events using the future source-to-sensor event shape.</div>
        <div>${rows}</div>
      </div>
    `;
  }

  public destroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    super.destroy();
  }
}
