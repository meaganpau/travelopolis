import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Trips extends Component {
    state = {
        trips: '',
        status: 'Loading...'
    };  

    getTrips = userID => {
        axios.get(`/api/trips/user/${userID}`)
            .then(res => {
                if (res.data.length) {
                    this.setState({ trips: res.data });
                } else {
                    this.setState({ status: 'No trips found.' });
                }
            })
            .catch(e => {
                console.log(e);
                this.setState({ status: 'Error loading trips.' });
            })
    }

    componentDidMount() {
        this.setState({ user: this.props.user}, () => { 
            this.getTrips(this.state.user._id);
        })
    }

    render() {
        return (
            <div>
                <Link to='/admin/add_trip'>Add Trip</Link>
                <ul>
                    {this.state.trips !== '' ?
                        this.state.trips.map(trip => (
                            <li key={trip._id}>
                                <Link to={`/admin/trip/${trip._id}`}>{trip.name}</Link>
                                <button onClick={this.editTrip}>Edit</button>
                            </li>
                        )) 
                    : `${this.state.status}`}
                </ul>
            </div>
        )
    }
};

export default Trips