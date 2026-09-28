import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./TelanganaMap.css";

function TelanganaMap() {
  return (
    <div className="telangana-map">
      <MapContainer
        center={[17.385, 78.4867]}
        zoom={7}
        scrollWheelZoom={false}
        className="telangana-map__container"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}

export default TelanganaMap;