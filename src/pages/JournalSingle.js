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
        if (res.data.length) {
          this.setState({ journal: res.data[0] });
        } else {
          this.setState({ status: 'Nothing found.' });
        }
      })
      .catch (e => {
        console.log(e);
        this.setState({ status: e });
      });
  }

  componentDidMount() {
    const { userSlug, match, trip } = this.props;
    this.setState({ 
      journalSlug: match.params.journal,
      userSlug,
      trip
    }, () =>{
      this.getJournal(this.state.journalSlug);
    });
  }

  render() {
    const { journal, userSlug, trip } = this.state;
    const { title, content } = journal;
    return (
      <div>
        { journal ? 
          <article>
            <h1>{title}</h1>
            <p dangerouslySetInnerHTML={{__html: content}} />
          </article> : null }
        <Link to={`/${userSlug}/${trip}`}>Back</Link>
      </div>
    )
  }
}

export default Journal;