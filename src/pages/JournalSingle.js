import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header'

class Journal extends Component {
  state = {
    journalSlug: '',
    journal: {
      title: '',
      content: ''
    },
    status: 'Loading...',
    trip: {}
  }

  getJournal = async journalSlug => {
    try {
      const res = await axios.get(`/api/journals/slug/${journalSlug}`)
      if (res.data.length) {
        this.setState({ 
          journal: res.data[0], 
          trip: res.data[0].trip
        });
      } else {
        this.setState({ status: 'Nothing found.' });
      }
    } catch (e) {
      console.log(e);
      this.setState({ status: e });
    };
  }


  componentDidMount() {
    const { userSlug, match } = this.props;
    this.setState({ 
      journalSlug: match.params.journal,
      userSlug
    }, () =>{
      this.getJournal(this.state.journalSlug);
    });
  }

  render() {
    const { journal, userSlug, trip, status } = this.state;
    const { title, content } = journal;
    
    const Breadcrumbs = () => (
      <div>
        <Link to={`/`}>Home</Link> >&nbsp;
        <Link to={`/${userSlug}`}>{userSlug}</Link> >&nbsp;
        <Link to={`/${userSlug}/${trip.slug}`}>{trip.name}</Link>
      </div>
    )

    return (
      <React.Fragment>
        <Header {...this.props}/>
        <Breadcrumbs />
        { journal.title ? 
          <article>
            <h1>{title}</h1>
            <p dangerouslySetInnerHTML={{__html: content}} />
          </article>
        : <p>{status}</p> }
      </React.Fragment>
    )
  }
}

export default Journal;