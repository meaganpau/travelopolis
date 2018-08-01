import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { format } from 'date-fns'
import styled from 'react-emotion';
import axios from 'axios';
import Header from '../components/Header'
import DoubleTitle from '../components/DoubleTitle'
import ContentContainer from '../components/ContentContainer'

const Date = styled('p')`
  font-size: 14px;
  letter-spacing: 1px;
`

const Text = styled('div')`
    font-family: 'Avenir Next', 'Helvetica Neue', sans-serif;
    letter-spacing: 0.3px;
    font-size: 18px;
    font-weight: 500;
    margin-top: 50px;
`

const Article = styled('article')`
  max-width: 800px;
  margin: 0 auto;
`

class Journal extends Component {
  state = {
    journalSlug: '',
    journal: {
      title: '',
      content: ''
    },
    status: 'Loading...',
    trip: {},
    userSlug: ''
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
    const { title, content, date } = journal;

    const JournalDate = format(date, 'MM/DD/YYYY')
    
    const Breadcrumbs = () => (
      <div>
        <Link to={`/${userSlug}`}>{userSlug}</Link>
        <img src="../../images/left-chevron.svg" alt="Left"/>
        <Link to={`/${userSlug}/${trip.slug}`}>{trip.name}</Link>
      </div>
    )

    return (
      <React.Fragment>
        <Header />
        <ContentContainer>
          <Breadcrumbs />
          { journal.title ? 
            <Article>
              <DoubleTitle>{title}</DoubleTitle>
              <Date>{JournalDate}</Date>
              <Text dangerouslySetInnerHTML={{__html: content}} />
            </Article>
          : <p>{status}</p> }
        </ContentContainer>
      </React.Fragment>
    )
  }
}

export default Journal;