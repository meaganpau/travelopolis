import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Trip extends Component {
    state = {
        trips: '',
        status: 'Loading...',
        user: null,
        slug: null
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

    getUser = userSlug => {
      axios.get(`/api/users/slug${userSlug}`)
        .then(res => {
            if (res.data) {
                this.setState({ user: res.data[0] });
                this.getTrips(this.state.user._id);
            }
        })
        .catch (e => {
            console.log(e);
            this.setState({ status: 'Error loading user.' });
        });
    }

    componentDidMount() {
      const location = this.props.location.pathname;
      if (location !== '/login/' || location !== '/admin/' || location !== '/explore/' || location !== '/register/') {
          this.setState({ location }, () => {
              this.getUser(this.state.location)
          })
      }
      this.setState({ 
        user: this.props.user, 
        slug: this.props.slug
      })
    }

    render() {
      return (
        <ul>
          {this.state.trips !== '' ?
              this.state.trips.map(trip => (
                <li key={trip.slug}>
                  <Link to={`/${this.state.user.slug}/${trip.slug}`}>{trip.name}</Link>
                </li>
              )) 
            : `${this.state.status}`}
        </ul>
      )
    }
};

export default Trip;
