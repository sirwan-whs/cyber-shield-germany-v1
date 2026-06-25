export type SensorTarget = {
  sensor_id: string;
  sensor_name: string;
  sensor_type: string;
  city: string;
  region: string;
  lat: number;
  lon: number;
  status: "online" | "offline";
};