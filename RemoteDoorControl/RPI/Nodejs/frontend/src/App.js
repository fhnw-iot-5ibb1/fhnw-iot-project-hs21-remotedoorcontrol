import React, { useEffect, useState } from 'react';
import DoorSwitch from './DoorSwitch/DoorSwitch'
import DoorStateDisplay from './DoorStateDisplay/DoorStateDisplay'
import AccessMap from './AccessMap/AccessMap'
import axios from 'axios';
const https = require('https');

function App() {
    let [door, setDoor ] = useState(true);
    let [isLoaded, setLoaded ] = useState(false);
    let [geolocationAccessPending, setGeolocationAccessPending] = useState(false);
    let [items, setItems ] = useState("");
    let [error, setError ] = useState("");
    let [accessLocations, setAccessLocations] = useState([]);
    let [geolocationCords, setGeoLocationCords] = useState({latitude: 0, longitude:0})
    let [accessGranted, setAccessGranted] = useState(false);
    let [dashboard, setDashboard] = useState({totalOperations:0, totalAccess:0, totalLocations:0})
    const [seconds, setSeconds] = useState(1);
    const agent = new https.Agent({  rejectUnauthorized: false });
    
    const onDoorChange = (checked) => {
      setDoor(checked);
      setItems("loading...")
      axios.get("https://3to5.ch:4001/api/door/OpenOrClose", { httpsAgent: agent }).then(
           result => {
               addWebhookIFTTT(checked ? "dooropen" : "doorclose");             
           },
           error => {
               setError("Error on opening door!");
           }
       );
     }

    useEffect(() => {
      const timer = setInterval(() => {    
        setSeconds(seconds + 1); 
        requestDoorState();  
        axios.get("https://3to5.ch:4001/api/service/TotalAccess", { httpsAgent: agent }).then(
          result => {           
              setDashboard(previousState => {
              return { ...previousState, totalAccess: result.data.data }
            });
          });

        axios.get("https://3to5.ch:4001/api/service/TotalOperations", { httpsAgent: agent }).then(result => {
            setDashboard(previousState => {
            return { ...previousState, totalOperations: result.data.data }
          });
        });
        axios.get("https://3to5.ch:4001/api/service/TotalAccessLocations", { httpsAgent: agent }).then(result => {
              setDashboard(previousState => {
              return { ...previousState, totalLocations: result.data.data }
            });
        });
    
      }, 1000);               
      return () => clearInterval(timer);
    });

    const requestDoorState = () => {
        // requestClientLocation();
        requestGeoLocationCoords();
        axios.get("https://3to5.ch:4001/api/door/Status", { httpsAgent: agent }).then(
            result => {
              setLoaded(true);
              setError(false);
              parseAndUpdateStateFromBackend(result.data.data);
          },
        error => {
            setError("asd"); 
        });
    }

    const parseAndUpdateStateFromBackend = (doorState) => {
      var jsonResult = JSON.parse(doorState.replace(/'/g, '"'));
      if(jsonResult !== undefined){
        if (jsonResult.motorA === 1 && door) {
            setItems("Door open!")
        }
        else if (jsonResult.motorA === 0 && !door) {
            setItems("Door closed!")
        }
        else {
            setItems("Loading...")
        }       
      }     
    }

    const sendAccessLocationToBackend = (position) => {
      if(position !== undefined){
        const rounding = 3;
        axios.post("https://3to5.ch:4001/api/location/Create?geo1="+position.longitude.toFixed(rounding)+"&geo2="+position.latitude.toFixed(rounding), { httpsAgent: agent } ,position).then(
          result => {
            setAccessLocations(result);
          },
          err => {
            console.log(err);
          }
        );
      }
    }

    const requestAccess = () => {
      navigator.permissions.query({name:'geolocation'}).then( permission => {
        console.log(permission.state);
        if (permission.state === 'granted') {
          if(!accessGranted){          
          navigator.geolocation.getCurrentPosition(function(position) {
            setGeoLocationCords(position.coords);
            setAccessGranted(true);
            sendAccessLocationToBackend(position.coords);              
          });
        }
        }if(permission.state === 'prompt'){
            if(!geolocationAccessPending){
              setGeolocationAccessPending(true);
              navigator.geolocation.getCurrentPosition(function(position) {
                setAccessGranted(true);
                setGeoLocationCords(position.coords); 
                sendAccessLocationToBackend(position.coords);      
              });
          }
        }else if(permission.state === 'denied'){
          setGeolocationAccessPending(false);
          setAccessGranted(false);
        }
      });
    }

    const requestGeoLocationCoords = () => {
      if (!navigator.permissions || !navigator.geolocation) {
        alert('Geolocation is not supported by your browser, please use another browser');
        return;
      }

      requestAccess();
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

    return ( 
        <>   
            <DoorStateDisplay isLoaded={isLoaded} error={error} items={items} dashboard={dashboard} requestDoorState={requestDoorState}/>
            {accessGranted ? <DoorSwitch id="door" checked={door} onChange={onDoorChange}/> : <span>GPS must be activated to access Service!<br></br></span> }       
        <br></br><AccessMap accessLocations={accessLocations} geolocationCords={geolocationCords}/>
        </>
    );
}

    /*const requestClientLocation = () => {
        axios.get("https://geolocation-db.com/json/").then(
            result => {
                //addMoreLocations(result.data);
            }
        )
    }*/

export default App;

