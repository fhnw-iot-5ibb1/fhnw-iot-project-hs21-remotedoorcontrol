import React, { Component } from "react";

export default class DoorStateDisplay extends Component {

    componentDidMount() {
        this.props.requestInitialDoorState();
        this.interval = setInterval(() => this.props.requestDoorState(), 1000);
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