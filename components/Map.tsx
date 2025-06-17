"use client"

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon, LatLngExpression } from 'leaflet'

interface MapProps {
  coordinates: {
    lat: number
    lng: number
  }
  title: string
}

// Fix for default marker icon in Next.js
const customIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

export function Map({ coordinates, title }: MapProps) {
  const position: LatLngExpression = [coordinates.lat, coordinates.lng]

  return (
    <MapContainer
      center={position}
      zoom={15}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={position}
        icon={customIcon}
      >
        <Popup>
          {title}
        </Popup>
      </Marker>
    </MapContainer>
  )
} 