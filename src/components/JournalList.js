import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

class Journal extends Component {
  state = {
    journals: [],
    tripSlug: '',
    trip: {},
    status: 'Loading...',
    userSlug: '',
    user: {}
  }

  getTripID = async tripSlug => {
    try {
      const res = await axios.get(`/api/trips/slug/${tripSlug}`)
      if (res.data.length) {
        this.setState({ trip: res.data[0] });
        this.getJournalData(this.state.trip._id)
      } else {
        this.setState({ status: 'No trips found' });
      }
    } catch (e) {
      console.log(e);
      this.setState({ status: e });
    };
  }

  getJournalData = async tripID => {
    try {
      const res = await axios.get(`/api/journals/tripid/${tripID}`)
      if (res.data.length) {
        this.setState({ journals: res.data });
      } else {
        this.setState({ status: 'No journals found.' });
      }
    } catch (e) {
      console.log(e);
      this.setState({ status: e });
    };
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

  getUserData = async userSlug => {
    try {
      const res = await axios.get(`/api/users/slug/${userSlug}`)
      if (res.data) {
          this.setState({ user: res.data[0] });
      }
    } catch (e) {
      console.log(e);
      this.setState({ status: 'Error loading user.' });
    };
  }

  render() {
    const { trip, journals, status, user, userSlug } = this.state;
    return (
      <div>
        {trip && user ? 
          <h1>{trip.name} by {user.firstName} {user.lastName}</h1>
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