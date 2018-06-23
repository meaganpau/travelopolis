import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

class Trip extends Component {
    state = {
        trips: '',
        status: 'Loading...'
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
          this.setState({ status: 'Error loading trips.' });
        })
    } 

    componentDidMount() {
      this.getTrips();
    }

    render() {
      return (
        <ul>
          {this.state.trips !== '' ?
              this.state.trips.map(trip => (
                <li key={trip.slug}>
                  <Link to={`/${trip.slug}`}>{trip.name}</Link>
                </li>
              )) 
            : `${this.state.status}`}
        </ul>
      )
    }
};

export default Trip;
