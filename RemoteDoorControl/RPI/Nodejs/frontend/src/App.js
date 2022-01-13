import React, { useEffect, useState } from 'react';
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
      //setDoor(checked);
      axios.get("https://3to5.ch:4001/api/door", { httpsAgent: agent }).then(
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
        axios.get("https://3to5.ch:4001/api/total_access", { httpsAgent: agent }).then(
          result => {           
            setDashboard(previousState => {
              return { ...previousState, totalAccess: result.data.data }
            });
          });

        axios.get("https://3to5.ch:4001/api/total_operations", { httpsAgent: agent }).then(result => {
          setDashboard(previousState => {
          return { ...previousState, totalOperations: result.data.data }
          });
        });
        //axios.get("https://3to5.ch:4001/api/total_locations", { httpsAgent: agent }).then(result => {console.log(result)});
    
      }, 1000);               
      return () => clearInterval(timer);
    });

    const requestDoorState = () => {
        // requestClientLocation();
        requestGeoLocationCoords();
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

    const requestAccess = () => {
      navigator.permissions.query({name:'geolocation'}).then( permission => {
        /*if (permission.state === 'granted') {
          console.log('granted');
          navigator.geolocation.getCurrentPosition(function(position) {
            setGeoLocationCords(position.coords);
            setAccessGranted(true);
            axios.get("https://3to5.ch:4001/api/location?geo1="+position.coords.longitude+"&geo2="+position.coords.latitude, { httpsAgent: agent } ,position.coords).then(
              result => {
                setAccessLocations(result);
                console.log(result);
              },
              err => {
                console.log(err);
              }
            );              
          });
        }*/if(permission.state === 'prompt'){
            if(!geolocationAccessPending){
              setGeolocationAccessPending(true);
              navigator.geolocation.getCurrentPosition(function(position) {
                setAccessGranted(true);
                setGeoLocationCords(position.coords); 
                axios.get("https://3to5.ch:4001/api/location?geo1="+position.coords.longitude+"&geo2="+position.coords.latitude, { httpsAgent: agent } ,position.coords).then(
              result => {
                setAccessLocations(result);
                console.log(result);
              },
              err => {
                console.log(err);
              }
            );             
            });
          }
        }else if(permission.state === 'denied'){
          setGeolocationAccessPending(false);
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

    const requestClientLocation = () => {
        axios.get("https://geolocation-db.com/json/").then(
            result => {
                //addMoreLocations(result.data);
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

    return ( 
        <>   
            <DoorStateDisplay isLoaded={isLoaded} error={error} items={items} dashboard={dashboard} requestDoorState={requestDoorState}/>
            {accessGranted ? <DoorSwitch id="door" checked={door} onChange={onDoorChange}/> : <span>GPS must be activated to access Service!<br></br></span> }       
        <br></br><AccessMap accessLocations={accessLocations} geolocationCords={geolocationCords}/>
        </>
    );

    //<DoorLog/>
}

export default App;