import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { format } from 'date-fns'
import styled from 'react-emotion';
import axios from 'axios';
import Header from '../components/Header'
import DoubleTitle from '../components/DoubleTitle'
import ContentContainer from '../components/ContentContainer'
import Footer from '../components/Footer'

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
    word-break: break-word;

    img {
      max-width: 100%;
    }
`

const Article = styled('article')`
  max-width: 800px;
  margin: 0 auto;
`

const Author = styled('p')`
  font-size: 14px;

  a {
    text-decoration: none;
    color: ${props => props.theme.color.font};
    border-bottom: 1px solid ${props => props.theme.color.font};
  }
`

const BreadcrumbContainer = styled('div')`
  img {
    margin-right: 10px;
    transform: translateY(-3px);

    &:not(:first-of-type) {
      margin-left: 10px;
    }
  }

  a {
    text-decoration: none;
    color: ${props => props.theme.color.font};

    &:hover {
      border-bottom: 1px solid ${props => props.theme.color.font};
    }
  }
`

const MetaContainer = styled('div')`
  display: flex;
  justify-content: space-between;
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
    userSlug: '',
    user: {}
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
      this.getUserData(this.state.userSlug);
    });
  }

  getUserData = async userSlug => {
    try {
      const res = await axios.get(`/api/users/slug/${userSlug}`)
      if (res.data) {
          this.setState({ user: res.data[0] });
      }
    } catch (e) {
      console.log(e);
      this.setState({ status: 'Error loading user.' });
    };
  }

  render() {
    const { journal, userSlug, trip, status, user } = this.state;
    const { title, content, date } = journal;

    const JournalDate = format(date, 'MM/DD/YYYY')

    const Breadcrumbs = () => {
      if (userSlug && user.firstName && trip.slug){
        return (
          <BreadcrumbContainer>
            <img src="../../images/left-chevron.svg" alt="Left"/>
            <Link to={`/${userSlug}`}>{`${user.firstName} ${user.lastName}`}</Link>
            <img src="../../images/left-chevron.svg" alt="Left"/>
            <Link to={`/${userSlug}/${trip.slug}`}>{trip.name}</Link>
          </BreadcrumbContainer>
        )
      }
      return null;
    }
    return (
      <React.Fragment>
        <Header />
        <ContentContainer>
          <Breadcrumbs />
          { journal.title ? 
            <Article>
              <DoubleTitle>{title}</DoubleTitle>
              <MetaContainer>
                <Author>By: {<Link to={`/${userSlug}`}>{user.firstName} {user.lastName}</Link>}</Author>
                <Date>{JournalDate}</Date>
              </MetaContainer>
              <Text dangerouslySetInnerHTML={{__html: content}} />
            </Article>
          : <p>{status}</p> }
        </ContentContainer>
        <Footer />
      </React.Fragment>
    )
  }
}

export default Journal;