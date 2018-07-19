import React, { Component } from "react";
import axios from 'axios';
import { getToken } from '../../services/tokenServices'

class Journal extends Component {
  state = {
    journalID: '',
    user: '',
    journalData: '',
    status: 'Loading...'
  }

  componentDidMount() {
    const journalID = this.props.match.params.journal;
    this.setState({ journalID }, () => {
      this.getJournalContent(this.state.journalID)
    })
  }

  getJournalContent = async journalID => {
    const token = getToken('userToken');
    if (token) {
      try {
        const res = await axios.get(`/api/journals/id/${journalID}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (res.data) {
          this.setState({ journalData: res.data });
        } else {
          this.setState({ status: 'No data found' });
        }
      } catch (e) {
        console.log(e);
        this.setState({ status: e });
      };
    }
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