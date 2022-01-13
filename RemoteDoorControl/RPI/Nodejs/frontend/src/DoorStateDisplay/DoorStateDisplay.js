import React from "react";
import './DoorStateDisplay.css'


const DoorStateDisplay = ({isLoaded, error, items, dashboard, requestDoorState}) => {
        
    return (
        <div>
        <div className="doorState"><p>{items}</p></div>
        <div className="card-group">
            <div className="card">
            <i className="fas fa-clock"></i>
                <div className="card-body">
                <h3 className="card-title">{dashboard.totalAccess}</h3>
                <p className="card-text">Total access</p>
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
            <div className="card">
                <i className="icon-2x color-light fa fa-bell-o"></i>
                
                <div className="card-body">
                <h3 className="card-title">{dashboard.totalOperations}</h3>
                <p className="card-text">Total Operations</p>
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
            <div className="card">
            <i className="icon-2x color-light fa fa-bell-o"></i>
                <div className="card-body">
                <h3 className="card-title">{dashboard.totalLocations}</h3>
                <p className="card-text">Total Locations</p>
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
        </div>
        </div>
    );
}

export default DoorStateDisplay;