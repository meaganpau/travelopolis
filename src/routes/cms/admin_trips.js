import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

class Journals extends Component {
  state = {
    tripID: null,
    user: null,
    journals: null,
    status: null
  }

  componentDidMount() {
    const tripID = this.props.match.params.trip;
    this.setState({
      tripID
    }, () => {
      this.getTripJournals(this.state.tripID)
    })
  }

  getTripJournals = tripId => {
    axios.get(`/api/journals/tripid/${tripId}`)
      .then(res => {
        if (res.data.length) {
          this.setState({ journals: res.data });
        } else {
          this.setState({ status: 'No journals found' });
        }
      })
      .catch (e => {
        console.log(e);
        this.setState({ status: e });
      });
  }
  
  render() {

    return (
      <div>
        {this.state.journals ? 
          this.state.journals.map(journal => (
            <li key={journal._id}>
              <Link to={`/admin/journal/${journal._id}`}>{journal.title}</Link>
            </li>
          ))   
        : `${this.state.status}`}
      </div>
    )
  }
}

export default Journals;