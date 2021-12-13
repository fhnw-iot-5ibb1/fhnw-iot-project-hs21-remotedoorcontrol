import React, { useState } from 'react';
import DoorSwitch from './DoorSwitch/DoorSwitch'
import DoorStateDisplay from './DoorStateDisplay/DoorStateDisplay'
import { DoorLog } from './DoorLog/DoorLog';

function App() {
    let [door, setDoor] = useState(false);

    const onDoorChange = (checked) => {
        setDoor(checked);
    }

    return (
        <>
            <h1>Welcome to RemoteDoorControl.</h1>
            <DoorStateDisplay/>
            <DoorSwitch id="door" checked={door} onChange={onDoorChange} />
            <DoorLog/>
        </>
    );
}

export default App;