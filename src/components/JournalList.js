import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

class Journal extends Component {
  state = {
    journals: null,
    tripSlug: this.props.slug,
    tripID: null,
    status: 'Loading...',
    userSlug: null
  }

  getTripID = tripSlug => {
    axios.get(`/api/trips/slug/${tripSlug}`)
      .then(res => {
        if (res.data.length) {
          this.setState({ tripID: res.data[0]._id });
          this.getJournalData(this.state.tripID)
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
    const location = this.props.location.pathname;
    const userSlug = location.split("/")[1];
    const tripSlug = location.split("/")[2];
    this.setState({
      tripSlug,
      userSlug
    }, () => {
      this.getTripID(this.state.tripSlug);
    })
  }

  render() {
    return (
      <div>
        {this.state.journals ? 
          this.state.journals.map(journal => (
            <li key={journal.slug}>
              <Link to={`/${this.state.userSlug}/${this.state.tripSlug}/${journal.slug}`}>{journal.title}</Link>
            </li>
          ))   
        : `${this.state.status}`}
        <Link to={`/${this.state.userSlug}`}>Back</Link>
      </div>
    )
  }
}

export default Journal;