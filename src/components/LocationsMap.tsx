'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom icon for markers
const customIcon = new L.Icon({
  iconUrl: '/leaflet/marker-icon.png',
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: '/leaflet/marker-shadow.png',
  shadowSize: [41, 41]
});

export default function LocationsMap({ chinaLabel, cameroonLabel }: { chinaLabel: string; cameroonLabel: string }) {
  return (
    <MapContainer center={[13.0, 60.0]} zoom={3} className="h-full"> {/* Adjusted zoom and center */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[23.1291, 113.2644]} icon={customIcon}>
        <Popup>{chinaLabel}</Popup>
      </Marker>
      <Marker position={[4.0511, 9.7679]} icon={customIcon}>
        <Popup>{cameroonLabel}</Popup>
      </Marker>
    </MapContainer>
  );
}
