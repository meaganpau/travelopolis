import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

class Journal extends Component {
  state = {
    journalSlug: null,
    journal: {
      title: null,
      content: null
    },
    status: 'Loading...'
  }

  getJournal = journalSlug => {
    axios.get(`/api/journals/slug/${journalSlug}`)
      .then(res => {
        if (res.data) {
          this.setState({ journal: res.data[0] });
        }
      })
      .catch (e => {
        console.log(e);
        this.setState({ status: e });
      });
  }

  componentDidMount() {
    this.setState({ journalSlug: this.props.journal }, () =>{
      this.getJournal(this.state.journalSlug);
    });
  }

  render() {
    const { title, content } = this.state.journal;

    return (
      <div>
        { this.state.journal ? 
          <article>
            <h1>{title}</h1>
            <p>{content}</p>
          </article> : null }
        <Link to={`/${this.props.trip}`}>Back</Link>
      </div>
    )
  }
}

export default Journal;