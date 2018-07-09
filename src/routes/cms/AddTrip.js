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
    this.setState({ journalID })
  }

  handleSubmit = e => {
    e.preventDefault();
    axios.post(`/api/trip/`, {
        name: this.state.tripName,
        user: this.state.user,
        slug: this.state.tripSlug
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
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.handleTripNameChange} />
        <input onChange={this.handleTripSlugChange} />
        <input type="submit" value="Add Trip"/>
      </form>
    )
  }
}

export default AddTrip;