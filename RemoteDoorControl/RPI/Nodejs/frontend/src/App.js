import React, { useState } from 'react';
import DoorSwitch from './DoorSwitch/DoorSwitch'
import DoorStateDisplay from './DoorStateDisplay/DoorStateDisplay'
import AccessMap from './AccessMap/AccessMap'
// import { DoorLog } from './DoorLog/DoorLog';
import axios from 'axios';
const https = require('https');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; 

function App() {
    let [door, setDoor ] = useState(true);
    let [isLoaded, setLoaded ] = useState(false);
    let [items, setItems ] = useState("");
    let [error, setError ] = useState("");
    let [accessLocations, setAccessLocations] = useState([]);
    let [geolocationCords, setGeoLocationCords] = useState({latitude: 0, longitude:0})
    let [accessGranted, setAccessGranted] = useState(false);

      // At request level
      const agent = new https.Agent({  
        rejectUnauthorized: false
      });

      // handle click event of the button to add item
    const addMoreLocations = (locationResponse) => {
        setAccessLocations(prevItems => [...prevItems, {
        id: prevItems.length,
        value: locationResponse
        }]);
    }

    const requestGeoLocationCoords = () => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setAccessGranted(true);
            setGeoLocationCords(position.coords)
        });       
    }

    const requestDoorState = () => {
        if(!accessGranted){
            requestClientLocation();
            requestGeoLocationCoords();
        } 

        axios.get("https://3to5.ch:4001/api/status", { httpsAgent: agent }).then(
        result => {            
            setLoaded(true);
            setError(false);
            setItems(result.data.data);
            setDoor(result.data.data.slice(29, result.data.data.length -9) === '1' ? false : true);
        },
        error => {
            setError("asd"); 
        }
    );
    }

    const requestClientLocation = () => {
        axios.get("https://geolocation-db.com/json/").then(
            result => {
                addMoreLocations(result.data);
            }
        )
    }


    const addWebhookIFTTT = (doorState) => {
        axios({
            method: "POST",
            url: "https://maker.ifttt.com/trigger/"+doorState+"/with/key/n8GHRqC0klAB9dOnpXQglQX7hS-X3XeivMmbPBdtMqQ?value1='Baschi'&value2={'lng':'"+geolocationCords.latitude+"','lat':'"+geolocationCords.longitude+"'}&value3="+JSON.stringify(accessLocations),
          })
          .then(res => { 
            console.log("res", res.data.message);
          })
          .catch(err => {
            console.log("error in IFTTT request", err);
          })
    }

    const onDoorChange = (checked) => {
       setDoor(checked);
       axios.get("https://3to5.ch:4001/api/door", { httpsAgent: agent }).then(
            result => {
                addWebhookIFTTT(checked ? "dooropen" : "doorclose");             
            },
            error => {
                setError("Error on opening door!");
            }
        );
    }

    return (
        <>         
            <DoorStateDisplay isLoaded={isLoaded} error={error} items={items} requestDoorState={requestDoorState}/>
            {accessGranted ? <DoorSwitch id="door" checked={door} onChange={onDoorChange}/> : <span>GPS must be activated to access Service!<br></br></span> }       
        <br></br><AccessMap accessLocations={accessLocations} geolocationCords={geolocationCords}/>
        </>
    );

    //<DoorLog/>
}

export default App;


    /*const getLocation = () => {
        if (!navigator.geolocation) {
          //setStatus('Geolocation is not supported by your browser');
        } else {
          // setStatus('Locating...');
          navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
          }, () => {
           // setStatus('Unable to retrieve your location');
          });
        }

        return null;
      }
      */

          /*
    const getCoords = () => {
        return new Promise((resolve, reject) =>
        navigator.permissions ?
    
          // Permission API is implemented
          navigator.permissions.query({
            name: 'geolocation'
          }).then(permission =>
            // is geolocation granted?
            permission.state === "granted"
              ? navigator.geolocation.getCurrentPosition(pos => resolve(pos.coords)) 
              : resolve(null)
          ) :
    
        // Permission API was not implemented
        reject(new Error("Permission API is not supported"))
      )
    } 

    */

    
    /*const requestInitialDoorState = () => {        
        requestGeoLocationCoords();
        requestClientLocation();
        axios.get("https://3to5.ch:4001/api/status", { httpsAgent: agent }).then(
        result => {
            setLoaded(false);
            setError(false);            
            
        },
        error => {
            setError("asd"); 
        }
    );
    }
    */
