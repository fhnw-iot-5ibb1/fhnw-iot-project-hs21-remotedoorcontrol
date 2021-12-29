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

    

    const requestDoorState = () => {
        axios.get("https://192.168.192.52:4001/api/status").then(
        result => {            
            setItems(result.data);
            setLoaded(true);
            setError(false);            
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
        <DoorStateDisplay isLoaded={isLoaded} items={items} error={error} requestDoorState={requestDoorState}/>
        <DoorSwitch id="door" checked={door} onChange={onDoorChange}/>        
        <DoorLog/>
        </>
    );
}


export default App;