import test from 'node:test';
import assert from 'node:assert/strict';
import { getDemoSensorNetwork } from '../src/services/sensor-network-demo.ts';

test('getDemoSensorNetwork returns Germany sensors with status and risk metadata', () => {
  const sensors = getDemoSensorNetwork();

  assert.equal(sensors.length, 4);
  assert.deepEqual(
    sensors.map((sensor) => sensor.name),
    ['Sensor Berlin', 'Sensor Frankfurt', 'Sensor München', 'Sensor Hamburg'],
  );
  assert.ok(sensors.every((sensor) => ['online', 'offline'].includes(sensor.status)));
  assert.ok(sensors.every((sensor) => typeof sensor.lastEvent === 'string' && sensor.lastEvent.length > 0));
  assert.ok(sensors.every((sensor) => typeof sensor.risk === 'string' && sensor.risk.length > 0));
  assert.ok(sensors.every((sensor) => Number.isInteger(sensor.attackCount) && sensor.attackCount >= 0));
});
