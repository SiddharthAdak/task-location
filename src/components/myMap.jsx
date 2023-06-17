import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import './myMap.css';
import L from "leaflet"

function MyMap({ selectedOrigin, selectedDest }) {
    let originIcon = L.icon({
        iconUrl: "/marker.png",
        iconSize: [25, 35],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
    });
    let destIcon = L.icon({
        iconUrl: "/marker1.png",
        iconSize: [25, 35],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
    });
    return (
        <div>
            <MapContainer center={[19.0760, 72.8777]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    noWrap="true"
                    minZoom="2"
                />
                {selectedOrigin && <Marker icon={originIcon}
                    position={[selectedOrigin.lat, selectedOrigin.lon]}>
                    <Popup>
                        Starting point
                    </Popup>
                </Marker>}
                {selectedDest && <Marker icon = {destIcon} position={[selectedDest.lat, selectedDest.lon]}>
                    <Popup>
                        Destination
                    </Popup>
                </Marker>}

            </MapContainer>
        </div>
    )
}

export default MyMap;






