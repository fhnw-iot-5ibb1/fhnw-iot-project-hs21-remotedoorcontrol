import React, { useState } from 'react';
import DoorSwitch from './DoorSwitch/DoorSwitch'
import DoorStateDisplay from './DoorStateDisplay/DoorStateDisplay'
import { DoorLog } from './DoorLog/DoorLog';
import axios from 'axios';
 
function App() {
    let [door, setDoor ] = useState(true);
    let [isLoaded, setLoaded ] = useState(false);
    let [items, setItems ] = useState("");
    let [error, setError ] = useState("");

    
    const requestInitialDoorState = () => {
        axios.get("https://192.168.192.52:4001/api/status").then(
        result => {
            setLoaded(false);
            setError(false);            
            setDoor(result.data.data.slice(29, result.data.data.length -9) === '1' ? true : false);
        },
        error => {
            setError("asd"); 
        }
    );
    }

    const requestDoorState = () => {
        axios.get("https://192.168.192.52:4001/api/status").then(
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
       axios.get("https://192.168.192.52:4001/api/door").then(
            result => {
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
        <DoorLog/>
        </>
    );
}


export default App;