'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customIcon = new L.Icon({
  iconUrl: '/leaflet/marker-icon.png',
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: '/leaflet/marker-shadow.png',
  shadowSize: [41, 41],
});

export type MapPoint = { city: string; role: string; position: [number, number] };

/** World map with one marker per office city, framed to show them all. */
export default function LocationsMap({ points }: { points: MapPoint[] }) {
  const bounds = L.latLngBounds(points.map((p) => p.position)).pad(0.15);
  return (
    <MapContainer bounds={bounds} scrollWheelZoom={false} className="h-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {points.map((p) => (
        <Marker key={p.city} position={p.position} icon={customIcon} alt={p.city}>
          <Popup>
            <strong>{p.city}</strong>
            <br />
            {p.role}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
