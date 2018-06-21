import React, { Component } from "react";
import axios from 'axios';

class Trip extends Component {
  state = {
    journals: []

  }
  
  componentDidMount() {
    // console.log(this.props.trip);
    this.getJournals(this.props.trip._id);
  }

  getJournals = id => {
    axios.get(`/api/journals/${id}`)
      .then(res => {
        if (res.data) {
          this.setState({ journals: res.data });
        }
      })
      .catch(e => {
        console.log(e);
      })
  } 

  showReturn = () => {
    if (this.state.journals.length > 0) {
      
    } else {
      return 'Write a new journal!';
    }
  }

  render() {
    return (
      <div>
        { this.showReturn() }
      </div>
      // <div>Welcome to {name}</div>
    );
  }
};

export default Trip;
