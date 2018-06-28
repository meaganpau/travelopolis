import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

class AddTrip extends Component {
  state = {
    user: null,
    tripName: '',
    tripSlug: '',
    status: ''
  }

  componentDidMount() {
    console.log(this.props);
    // this.setState({ journalID })
  }

  addTrip = () => {
    axios.post(`/api/trip/`, {
        name: 'New Trip test',
        user: 123456,
        slug: 'newtrip'
        // name: this.state.tripName,
        // user: this.state.user,
        // slug: this.state.tripSlug
    })
      .then(res => {
          console.log(res);
      })
      .catch (e => {
        console.log(e);
        this.setState({ status: e });
    });
  }
  
  render() {

    return (
      <div>
        <input onChange={this.handleTripNameChange} />
        <input onChange={this.handleTripSlugChange} />
        <button onClick={this.addTrip}>Add Trip</button>
      </div>
    )
  }
}

export default AddTrip;