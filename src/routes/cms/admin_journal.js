import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

class Journal extends Component {
  state = {
    journalID: null,
    user: null,
    journalData: null,
    status: 'Loading...'
  }

  componentDidMount() {
    const journalID = this.props.match.params.journal;
    this.setState({ journalID }, () => {
      this.getJournalContent(this.state.journalID)
    })
  }

  getJournalContent = journalID => {
    axios.get(`/api/journals/id/${journalID}`)
      .then(res => {
        if (res.data) {
          this.setState({ journalData: res.data });
        } else {
          this.setState({ status: 'No data found' });
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
        {this.state.journalData ? 
          <div>
            <h1>{this.state.journalData.title}</h1>
            <p>{this.state.journalData.content}</p>
          </div>
        : `${this.state.status}`}
      </div>
    )
  }
}

export default Journal;