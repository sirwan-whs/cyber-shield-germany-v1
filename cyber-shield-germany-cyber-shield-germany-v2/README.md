# Cyber Shield Germany

Cyber Shield Germany is a cyber situational awareness dashboard and cyber threat map focused on Germany. It shows infrastructure layers, cyber demo attacks, sensor targets inside Germany, and a live cyber attack feed for presentation and development work.

The current intended frontend variant is `cyber-de`.

## Project Purpose

This project is a cybersecurity-focused situational awareness dashboard for Germany. It is built to help visualize cyber activity against German sensor targets and related infrastructure context.

The dashboard currently provides:

- A Germany-focused map view.
- Infrastructure layers such as cables, outages, datacenters, and cloud regions.
- Demo cyber attacks rendered as source-to-target paths.
- Sensor targets inside Germany, such as Berlin, Frankfurt, Munich, and Hamburg.
- A live Cyber Intelligence feed showing the same active demo attacks as the map.
- A frontend demo attack system designed to be replaced later by real sensor events.

## Current Architecture

- **Frontend:** Vite and TypeScript single-page app.
- **Map rendering:** DeckGL and MapLibre map layers.
- **Cyber demo attacks:** Frontend demo event source that produces active attack events.
- **Cyber Intelligence panel:** Live attack feed that reads from the same active attack events used by the map.
- **Sidecar/local API:** Local Node sidecar serves `/api/cyber/...`.
- **nginx:** Public server routes `/api/` to the sidecar and `/` to the frontend preview service.
- **systemd services:**
  - `worldmonitor-sidecar-api` on port `8787`.
  - `worldmonitor-frontend` on port `3000`.

On the public server, nginx is expected to keep same-origin API routing:

- `https://194.94.127.116/api/...` -> `http://127.0.0.1:8787/api/...`
- `https://194.94.127.116/` -> `http://127.0.0.1:3000/`

## Current Important Frontend Files

### `src/components/DeckGLMap.ts`

Main DeckGL map renderer.

It renders the regular map layers and the current cyber demo attack visualization:

- Source-to-target cyber attack arcs.
- Source markers.
- Target sensor markers.
- Moving packet dots along the attack path.
- Pulse rings around sources and target sensors.

The real `cyber-threats-layer` logic is separate from the demo attack visualization and should not be removed when working on the demo.

### `src/components/CyberIntelPanel.ts`

Renders the live attack feed in the `Cyber Intelligence` panel.

The panel reads the same active demo attack events as the map, so the feed and map stay synchronized. Each feed row shows compact attack details such as time, protocol, source, target sensor, target region, source IP, action, and family.

### `src/services/demo-cyber-attacks.ts`

Contains the frontend demo attack system:

- Demo sensor targets.
- Demo cyber attack events.
- Active event selection.
- Reusable internal attack event structure.

This file is intentionally shaped so future real sensor events can be adapted into the same format without rewriting the map or feed UI.

### `src/utils/urlState.ts`

Parses shareable URL state for the app.

Important behavior:

- `view=de` is treated as an alias for `view=germany`.
- This keeps older German-view links working with the current Germany map preset.

Example useful URL:

```text
https://194.94.127.116/?view=germany&layers=cables,outages,cyberThreats,datacenters,cloudRegions
```

## Demo Attack System

The current cyber attacks are demo data. They are not live sensor events yet.

They are intentionally structured to be easy to replace with real sensor data later.

### `DEMO_CYBER_ATTACKS_ENABLED`

Global frontend flag that controls whether demo attacks are active.

When this is `true`, the map and Cyber Intelligence feed use the demo event source.

### `DEMO_SENSOR_TARGETS`

Defines the demo sensor targets inside Germany.

Current example targets include:

- `Sensor Berlin`
- `Sensor Frankfurt`
- `Sensor Munich`
- `Sensor Hamburg`

Each target includes a sensor id, sensor name, sensor type, city, region, and map position.

### `DEMO_CYBER_ATTACK_EVENTS`

Defines the predefined demo cyber attack events.

The current set includes around 20 events. They include both international-to-Germany and Germany-to-Germany examples, such as:

- London -> Sensor Frankfurt
- Hamburg -> Sensor Munich
- Frankfurt -> Sensor Berlin
- Berlin -> Sensor Munich
- Munich -> Sensor Berlin

Each event contains fields close to the expected future sensor payload, including protocol, source IP, source city/country, target sensor id, action, family, severity, and raw metadata.

### Active Demo Attack Selection

The helper `getActiveDemoCyberAttackEvents()` selects a small active subset of the predefined events.

Current behavior:

- Events rotate once per minute.
- Each minute activates around 4 or 5 attacks.
- Selection is deterministic enough for demos but changes enough to feel alive.

### Shared Map And Feed Source

The map and Cyber Intelligence feed both call the same active event helper.

This is important:

- The map shows the active attacks as arcs and markers.
- The Cyber Intelligence panel lists the same active attacks as a compact feed.
- Future real sensor events should preserve this single-source pattern.

## Future Real Sensor Event Shape

Future sensor events are expected to look approximately like this:

```json
{
  "sensor_id": "...",
  "sensor_type": "...",
  "protocol": "ssh",
  "src_ip": "...",
  "event_action": "...",
  "event_family": "...",
  "raw": {}
}
```

Future work should add a mapper or adapter that converts real sensor events into the same internal attack-event format used today by the demo attacks.

The goal is:

1. Receive or fetch real sensor JSON.
2. Normalize it in one adapter.
3. Map it to the current internal attack shape.
4. Keep the existing map style and Cyber Intelligence feed.

Avoid rewriting the visualization when real sensor data arrives.

## Future Work / Trainee Tasks

Suggested next tasks:

- Build a `Sensor Network Status` or `Sensor Overview` panel that shows sensors, status, region, type, last attack, and risk level.
- Build a sensor event adapter that receives or normalizes real sensor JSON and maps it to the current attack visualization/feed format.
- Later connect the frontend to a real backend endpoint instead of the demo event source.
- Keep the same visual attack style: source -> arc/path -> target sensor inside Germany.
- Keep the Cyber Intelligence feed using the same event source as the map.
- Add clear sensor naming once real deployment regions are known, for example `Sensor Berlin`, `Sensor Frankfurt`, `Sensor Munich`, and `Sensor Hamburg`.
- Add tests or fixture checks for the event adapter once real event samples are available.

## Trainee Task Details

This section expands the next two trainee tasks into concrete frontend work.

### Task 1: Sensor Network Status Panel

Goal: build a useful panel that shows the sensor network inside Germany.

For now, the panel can use demo/static sensor data. It should show demo sensors such as:

- `Sensor Berlin`
- `Sensor Frankfurt`
- `Sensor Munich`
- `Sensor Hamburg`

Each sensor row or card should show:

- Sensor id.
- Sensor name.
- City and region.
- Sensor type.
- Status: `online` or `offline`.
- Last event time.
- Current risk level.
- Number of recent attacks.

This panel should later use real backend sensor data, but it does not need a backend in the first implementation. It can start from the current demo sensor targets and derived demo attack counts.

Expected result: a developer can open the `cyber-de` app and see a clear sensor overview panel that helps explain which sensors exist, where they are, and whether they are active.

### Task 2: Sensor Event Adapter / Real Data Readiness

Goal: prepare the frontend so real sensor JSON can be converted into the same internal attack-event format currently used by demo attacks.

Future input JSON example:

```json
{
  "sensor_id": "sensor-berlin-01",
  "sensor_type": "ssh-honeypot",
  "protocol": "ssh",
  "src_ip": "45.83.64.120",
  "event_action": "login_failed",
  "event_family": "brute_force",
  "raw": {}
}
```

The adapter should convert this into an internal event that the map and Cyber Intelligence feed can understand.

Intended adapter idea:

```ts
mapSensorEventToCyberAttackEvent(sensorEvent, sensorTargets)
```

The adapter should:

- Validate required fields such as `sensor_id` and `src_ip`.
- Find the target sensor by `sensor_id`.
- Attach target sensor name and location.
- Keep protocol, action, family, and raw metadata.
- Add a timestamp if one is missing.
- Prepare source location if available later.
- Return an event shape usable by the current map arcs and Cyber Intelligence feed.

Expected result: if a real backend later sends sensor events in the agreed JSON format, the frontend should only need to replace the demo event source with the real endpoint. The map style and feed should not need to be rewritten.

### Shared Contract Between Both Tasks

Both trainee tasks should use the same sensor target structure.

Example:

```ts
type SensorTarget = {
  sensor_id: string;
  sensor_name: string;
  sensor_type: string;
  city: string;
  region: string;
  lat: number;
  lon: number;
  status: "online" | "offline";
};
```

Task 1 uses this structure to display sensors.

Task 2 uses this structure to map incoming events to target locations.

### Important Rule

Both tasks should stay frontend-only for now.

Do not implement a real backend yet.

Do not change nginx, systemd, or deployment config.

Do not remove the current demo attack system.

Do not break the current `cyber-de` map and Cyber Intelligence feed.

## Development Commands

Build the intended Cyber Shield frontend:

```bash
VITE_VARIANT=cyber-de VITE_ENABLE_CYBER_LAYER=true npm run build
```

Run a local production preview:

```bash
./node_modules/.bin/vite preview --host 127.0.0.1 --port 3000
```

The public server currently expects the frontend preview service on `127.0.0.1:3000`.

## Server Deployment Notes

After pulling frontend changes on the server:

```bash
cd "/home/ifis-user/Desktop/Cyber Shield Deutschland/worldmonitor_cysd"
git pull
VITE_VARIANT=cyber-de VITE_ENABLE_CYBER_LAYER=true npm run build
sudo systemctl restart worldmonitor-frontend
```

Do not restart the sidecar unless API files changed.

The persistent services are:

```bash
sudo systemctl status worldmonitor-frontend
sudo systemctl status worldmonitor-sidecar-api
```

Expected service routing:

- `worldmonitor-frontend` serves the built frontend through Vite preview on `127.0.0.1:3000`.
- `worldmonitor-sidecar-api` serves the local API on `127.0.0.1:8787`.
- nginx keeps `/api/` routed to the sidecar and `/` routed to the frontend preview.

## Important Warning

Do not commit or edit server-specific nginx/systemd config files from the frontend repo.

Do not commit `dist/` unless the repo already intentionally tracks it.

Do not change the real `/api/cyber` routing unless needed.

Do not manually copy files between multiple local project folders. Use the active source folder for this branch.

Do not refactor broad map rendering when working on demo cyber attacks. Keep changes localized unless a larger change is explicitly approved.

## Verification Commands

Verify that the public frontend is serving the cyber-de build and current main asset:

```bash
curl -k -sS 'https://194.94.127.116/' | grep -o -E "v='cyber-de'|main-[A-Za-z0-9_-]+\\.js" | head
```

Verify that the public cyber API returns JSON instead of app HTML:

```bash
curl -k -sS -D - 'https://194.94.127.116/api/cyber/v1/list-cyber-threats?page_size=5' | head -40
```

Expected API result:

- HTTP status `200 OK`.
- `Content-Type: application/json`.
- JSON body with `threats` and `pagination`.

## Quick Visual Check

Open the public Germany cyber map:

```text
https://194.94.127.116/?view=germany&layers=cables,outages,cyberThreats,datacenters,cloudRegions
```

Expected visible behavior:

- Cyber-focused panels remain active.
- Demo cyber attacks appear as source-to-target arcs.
- Moving packet dots travel along attack paths.
- Target sensor points pulse inside Germany.
- The `Cyber Intelligence` panel shows the active demo attack feed.
