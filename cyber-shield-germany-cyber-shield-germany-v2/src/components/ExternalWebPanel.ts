import { Panel } from './Panel';

export class ExternalWebPanel extends Panel {
  constructor() {
    super({
      id: 'cyber-map',
      title: 'Live Cyber Threat Map',
    });

    // Zugriff auf das Hauptpanel-Element
    const el = this.getElement();

    // Panel-Body suchen (so wie andere Panels es machen)
    const body = el.querySelector('.panel-content') as HTMLElement;

    if (body) {
   body.innerHTML = `
  <div style="text-align:center;padding:40px">
    <h2>Live Cyber Threat Map</h2>
    <p>Real-time global cyber attacks</p>
    <button id="openThreatMapBtn"
      style="
        padding:12px 20px;
        background:#00ff88;
        border:none;
        cursor:pointer;
        font-weight:bold;
      ">
      Open Live Threat Map
    </button>
  </div>
`;

body.querySelector('#openThreatMapBtn')?.addEventListener('click', () => {
  window.open('https://threatmap.checkpoint.com/', '_blank');
});
    }
  }
}
