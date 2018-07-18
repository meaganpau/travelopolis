import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

class Journal extends Component {
  state = {
    journals: null,
    tripSlug: '',
    trip: null,
    status: 'Loading...',
    userSlug: '',
    user: null
  }

  getTripID = tripSlug => {
    axios.get(`/api/trips/slug/${tripSlug}`)
      .then(res => {
        if (res.data.length) {
          this.setState({ trip: res.data[0] });
          this.getJournalData(this.state.trip._id)
        } else {
          this.setState({ status: 'No trips found' });
        }
      })
      .catch (e => {
        console.log(e);
        this.setState({ status: e });
      });
  }

  getJournalData = tripID => {
    axios.get(`/api/journals/tripid/${tripID}`)
      .then(res => {
        if (res.data.length) {
          this.setState({ journals: res.data });
        } else {
          this.setState({ status: 'No journals found.' });
        }
      })
      .catch (e => {
        console.log(e);
        this.setState({ status: e });
      });
  }

  componentDidMount() {
    const { userSlug, tripSlug } = this.props
    this.setState({
      tripSlug,
      userSlug
    }, () => {
      this.getTripID(this.state.tripSlug);
      this.getUserData(this.state.userSlug);
    })
  }

  getUserData = userSlug => {
    axios.get(`/api/users/slug/${userSlug}`)
      .then(res => {
        console.log(res);
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

  render() {
    const { trip, journals, status, user, userSlug } = this.state;
    console.log(user);
    return (
      <div>
        {trip && user ? 
          <div>            
            <h1>{trip.name}</h1>
            <h2>{user.firstName} {user.lastName}</h2>
          </div>
        : null} 
        {journals ? 
          journals.map(journal => (
            <li key={journal.slug}>
              <Link to={`/${user.slug}/${trip.slug}/${journal.slug}`}>{journal.title}</Link>
            </li>
          ))   
        : `${status}`}
        <Link to={`/${userSlug}`}>Back</Link>
      </div>
    )
  }
}

export default Journal;