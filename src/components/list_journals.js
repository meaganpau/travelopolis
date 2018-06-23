import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

class Journal extends Component {
  state = {
    journals: null,
    tripSlug: this.props.slug,
    tripID: null,
    status: 'Loading...'
  }

  getTripID = tripSlug => {
    axios.get(`/api/trips/slug/${tripSlug}`)
      .then(res => {
        if (res.data) {
          this.setState({ tripID: res.data[0]._id });
          this.getJournalData(this.state.tripID)
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
        if (res.data) {
          this.setState({ journals: res.data });
        }
      })
      .catch (e => {
        console.log(e);
        this.setState({ status: e });
      });
  }

  componentDidMount() {
    this.getTripID(this.state.tripSlug);
  }

  render() {
    return (
      <div>
        {this.state.journals ? 
          this.state.journals.map(journal => (
            <li key={journal.slug}>
              <Link to={`/${this.state.tripSlug}/${journal.slug}`}>{journal.title}</Link>
            </li>
          ))   
        : `${this.state.status}`}
        <Link to='/'>Back</Link>
      </div>
    )
  }
}

export default Journal;