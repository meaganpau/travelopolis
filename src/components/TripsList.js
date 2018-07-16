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
      axios.get(`/api/users/slug/${userSlug}`)
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
      const { userSlug } = this.props.match.params;
      if (userSlug !== '/login/' || userSlug !== '/admin/' || userSlug !== '/explore/' || userSlug !== '/register/') {
          this.setState({ userSlug }, () => {
              this.getUser(this.state.userSlug)
          })
      }
      this.setState({ 
        user: this.props.user, 
        slug: this.props.slug
      })
    }

    render() {
      const { trips, user, status } = this.state;
      return (
        <div>
          { user ?
            <h1>{user.firstName} {user.lastName}'s Trips</h1> 
            : null
          }
          <ul>
            {trips !== '' ?
                trips.map(trip => (
                  <li key={trip.slug}>
                    <Link to={`/${user.slug}/${trip.slug}`}>{trip.name}</Link>
                  </li>
                )) 
              : `${status}`}
          </ul>
        </div>
      )
    }
};

export default Trip;
