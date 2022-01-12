import React, {useState} from 'react'
import './accessmap.css'
import { Icon } from "leaflet"; 
import { MapContainer, TileLayer, Marker, Popup  } from 'react-leaflet'

const AccessMap = ({ accessLocations, geolocationCords }) => {

    console.log(accessLocations);

    return (        
        <MapContainer center={[47.3667,8.55]} zoom={10}scrollWheelZoom={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>

            {accessLocations.length > 0 && accessLocations.map((marker) => (
                
            <Marker
                position={[
                    marker.value.latitude,
                    marker.value.longitude
                ]}
            >
                <Popup>'asd'</Popup>
            </Marker> 
            ))}

            <Marker markerColor='red' position={[geolocationCords.latitude, geolocationCords.longitude]}/>
         </MapContainer>
        )
}

export default AccessMap;