import React, { Component } from "react";
import axios from 'axios';

export default class DoorStateDisplay extends Component {
    state = {
        error: null,
        isLoaded: false,
        items: []
    };

    componentDidMount() {
        axios.get("https://172.22.156.180:4001/api/status").then(
            result => {
                this.setState({
                    isLoaded: true,
                    items: result.data
                });
            },
            error => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        );
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message} </div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                    {items.map(item => (
                        <li key={item.username}>
                            {item.username}: {item.name}
                        </li>
                    ))}
                </ul>
            );
        }
    }
}