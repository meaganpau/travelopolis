import React, { Component } from "react";
import Trip from "../components/trip_link";
import axios from 'axios';

class Trips extends Component {
    state = {
        trips: '',
        status: 'Loading trips...'
    };

    getTrips = () => {
        axios.get('/api/trips')
        .then(res => {
          if (res.data) {
            this.setState({ trips: res.data });
            this.props.handleGet(this.state.trips)
          }
        })
        .catch(e => {
          console.log(e);
          this.setState({ status: 'Error loading trips.' });
        })
    } 

    getResults = () => {
        if (this.state.trips !== '') {
            return (
                <ul className="Trips">
                    { Object.keys(this.state.trips).map((trip, i) => (
                        <li key={this.state.trips[i]._id}>
                            <Trip 
                                name={this.state.trips[i].name} 
                                slug={this.state.trips[i].slug}
                            />
                        </li>
                    )) }
                </ul>
    
            )
        } else {
            return (
                <div>{this.state.status}</div>
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
