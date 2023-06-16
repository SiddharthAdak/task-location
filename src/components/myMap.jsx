import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import './myMap.css';


function MyMap({selectedOrigin, selectedDest}){
    return(
        <div>
            <MapContainer center={[19.0760, 72.8777]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                noWrap = "true"
                minZoom = "2"
            />
            {selectedOrigin && <Marker position={[selectedOrigin.lat, selectedOrigin.lon]}>
                <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>}
            {selectedDest && <Marker position={[selectedDest.lat, selectedDest.lon]}>
                <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>}
            
            </MapContainer>
        </div>
    )
}

export default MyMap;






