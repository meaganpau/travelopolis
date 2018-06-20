import React, { Component } from "react";
import Trip from "../components/Trip";
import ReactDOM from 'react-dom';
import axios from 'axios';
import { 
    BrowserRouter as Router, 
    Route, Link } from 'react-router-dom';

class Trips extends Component {
    state = {
        trips: ''
    };

    getTrips = () => {
        axios.get('/api/trips')
        .then(res => {
          if (res.data) {
            this.setState({ trips: res.data });
          }
        })
        .catch(e => {
          console.log(e);
          let results = 'Nope';
        })
    } 

    getResults = () => {
        if (this.state.trips !== '') {
            return (
                <ul className="Trips">
                    { Object.keys(this.state.trips).map((trip, i) => (
                        <li key={this.state.trips[i]._id}>
                            <Link to="/trip">{this.state.trips[i].name}</Link>
                        </li>
                    )) }
                </ul>
    
            )
        } else {
            return (
                <div>Nope</div>
            )
        }
    }

    componentDidMount() {
        this.getTrips();
    }
    
    render() {
        return (
            <div>
                { this.getResults() }
            </div>
        );
    }
};

export default Trips;
