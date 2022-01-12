import React from "react";
import './DoorStateDisplay.css'


const DoorStateDisplay = ({isLoaded, error, items, requestDoorState}) => {
        
        requestDoorState();
        const interval = setInterval(() => requestDoorState(), 6000);

    return (
        <div>
            <div><p>{items}</p></div>
        <div className="card-group">
            <div className="card">
            <i className="fas fa-clock"></i>
                <div className="card-body">
                <h3 className="card-title">20</h3>
                <p className="card-text">Total access</p>
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
            <div className="card">
                <i className="icon-2x color-light fa fa-bell-o"></i>
                
                <div className="card-body">
                <h3 className="card-title">50</h3>
                <p className="card-text">Operations</p>
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
            <div className="card">
            <i className="icon-2x color-light fa fa-bell-o"></i>
                <div className="card-body">
                <h3 className="card-title">4</h3>
                <p className="card-text">Total Locations</p>
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
        </div>
        </div>
    );
}

export default DoorStateDisplay;


/*
import React, { Component } from "react";

export default class DoorStateDisplay extends Component {

    componentDidMount() {
        //this.props.requestInitialDoorState();
        
    }

    componentWillUnmount() { }

    render() {
        const { isLoaded, items, error } = this.props;
                
        if (error) {
            return <div>Error: {error.message} </div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                    <span key={items}>{items}</span>
                </ul>    
            );
        }
    }
}
*/