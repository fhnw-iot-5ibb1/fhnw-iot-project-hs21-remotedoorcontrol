import React from 'react'
import './accessmap.css'
import { Icon } from "leaflet"; 
import { MapContainer, TileLayer, Marker, Popup  } from 'react-leaflet'

const AccessMap = ({ accessLocations, geolocationCords }) => {

    var greenIcon = new Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      var itemCounter = 0;

    return (        
        <MapContainer center={[47.3667,8.55]} zoom={2}scrollWheelZoom={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
            
            {accessLocations.data && accessLocations.data.length > 0 && accessLocations.data.map(marker => (
            <Marker
                key={++itemCounter}
                position={[
                    JSON.parse(marker).latitude,
                    JSON.parse(marker).longitude
                ]}
            >
                <Popup>Access request!</Popup>
            </Marker>
            
            ))}

                <Marker key={++itemCounter} icon={greenIcon} position={[geolocationCords.latitude, geolocationCords.longitude]}><Popup>Your position!</Popup></Marker>
             </MapContainer>
        )
}

export default AccessMap;