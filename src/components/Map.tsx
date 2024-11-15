import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { TCoordinates } from "../types/Coordinates";

function Map({ lat, lon }: TCoordinates) {
  return (
    <MapContainer
      className="w-full h-full"
      center={[lat, lon]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lon]}></Marker>
    </MapContainer>
  );
}

export default Map;
