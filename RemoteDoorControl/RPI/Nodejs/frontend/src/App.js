import React, { useState } from 'react';
import DoorSwitch from './DoorSwitch/DoorSwitch'
import DoorStateDisplay from './DoorStateDisplay/DoorStateDisplay'
// import { DoorLog } from './DoorLog/DoorLog';
import axios from 'axios';
const https = require('https');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


function App() {
    let [door, setDoor ] = useState(true);
    let [isLoaded, setLoaded ] = useState(false);
    let [items, setItems ] = useState("");
    let [error, setError ] = useState("");
    
      
      // At request level
      const agent = new https.Agent({  
        rejectUnauthorized: false
      });

    
    const requestInitialDoorState = () => {
        axios.get("https://3to5.ch:4001/api/status", { httpsAgent: agent }).then(
        result => {
            setLoaded(false);
            setError(false);            
            setDoor(result.data.data.slice(29, result.data.data.length -9) === '1' ? false : true);
        },
        error => {
            setError("asd"); 
        }
    );
    }

    const requestDoorState = () => {

        axios.get("https://3to5.ch:4001/api/status", { httpsAgent: agent }).then(
        result => {            
            setLoaded(true);
            setError(false);
            setItems(result.data.data);
        },
        error => {
            setError("asd"); 
        }
    );
    }

    const onDoorChange = (checked) => {        
        setDoor(checked);
        
       axios.get("https://3to5.ch:4001/api/door", { httpsAgent: agent }).then(
            result => {
                if(checked){

                    axios({
                        method: "POST",
                        url: "https://maker.ifttt.com/trigger/door_close/with/key/n8GHRqC0klAB9dOnpXQglQX7hS-X3XeivMmbPBdtMqQ",
                        headers: {   
                            "Content-Type": "application/json"                       
                        },
                        JsonPayload: {
                             "value1" : "asd", "value2" : "asd", "value3" : "asd"
                        },
                      })
                      .then(res => { 
                        console.log("res", res.data.message);
                      })
                      .catch(err => {
                        console.log("error in request", err);
                      });                
                }else{
                    axios.get("https://maker.ifttt.com/trigger/dooropen/with/key/n8GHRqC0klAB9dOnpXQglQX7hS-X3XeivMmbPBdtMqQ").then(
                    result2 => {
                        console.log(result2);
                    }
                )
                }                
            },
            error => {
                setError("asd");
            }
        );
    } 

    return (
        <> 
        <DoorStateDisplay isLoaded={isLoaded} error={error} items={items} requestDoorState={requestDoorState} requestInitialDoorState={requestInitialDoorState}/>
        <DoorSwitch id="door" checked={door} onChange={onDoorChange}/>        
        
        </>
    );

    //<DoorLog/>
}


export default App;