import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import axios from 'axios';
import styled from 'react-emotion';
import Header from '../components/Header';
import ContentContainer from '../components/ContentContainer';
import DoubleTitle from '../components/DoubleTitle';
import Card from '../components/Card';
import Footer from '../components/Footer';

const MyLink = ({...props}) => <Link {...props}>{props.children}</Link>;

const JournalList = styled('ul')`
    padding: 0;
    margin-top: 30px;
    list-style: none;
    display: grid;
    grid-template-columns: 303px 303px 303px;
    grid-gap: 45px 60px;
    justify-content: space-between;

    li {
        display: inline-block;
    }
`

const InnerContainer = styled('article')`
  max-width: 1029px;
  margin: 0 auto;
`

const JournalLink = styled(MyLink)`
  text-decoration: none;
`

const BreadcrumbContainer = styled('div')`
  img {
    margin-right: 10px;
    transform: translateY(-3px);
  }

  a {
    text-decoration: none;
    color: ${props => props.theme.color.font};
    
    &:hover {
      span {
        border-bottom: 2px solid ${props => props.theme.color.font};
      }
    }
  }
`

class Journal extends Component {
  state = {
    journals: [],
    tripSlug: '',
    trip: {},
    status: 'Loading...',
    userSlug: '',
    user: {}
  }

  getTripID = async tripSlug => {
    try {
      const res = await axios.get(`/api/trips/slug/${tripSlug}`)
      if (res.data.length) {
        this.setState({ trip: res.data[0] });
        this.getJournalData(this.state.trip._id)
      } else {
        this.setState({ status: `No trips created yet.` });
      }
    } catch (e) {
      console.log(e);
      this.setState({ status: e });
    };
  }

  getJournalData = async tripID => {
    try {
      const res = await axios.get(`/api/journals/tripid/${tripID}`)
      if (res.data.length) {
        this.setState({ journals: res.data });
      } else {
        this.setState({ status: `Looks like ${this.state.user.firstName} hasn't written any journals yet 🙁. Check back later!` });
      }
    } catch (e) {
      console.log(e);
      this.setState({ status: e });
    };
  }

  componentDidMount() {
    const { userSlug, tripSlug } = this.props
    this.setState({
      tripSlug,
      userSlug
    }, () => {
      this.getTripID(this.state.tripSlug);
      this.getUserData(this.state.userSlug);
    })
  }

  getUserData = async userSlug => {
    try {
      const res = await axios.get(`/api/users/slug/${userSlug}`)
      if (res.data[0]) {
          this.setState({ user: res.data[0] });
      } else {
        this.setState({ status: 'User not found.' });
      }
    } catch (e) {
      console.log(e);
      this.setState({ status: 'Error loading user.' });
    };
  }

  render() {
    const { trip, journals, status, user, userSlug } = this.state;
    return (
      <React.Fragment>
        <Header />
        <ContentContainer>
          {user.firstName ? 
            <BreadcrumbContainer>
              <Link to={`/${userSlug}`}>
                <img src="../../images/left-chevron.svg" alt="Left"/>
                <span>{`${user.firstName} ${user.lastName}`}</span>
              </Link>
            </BreadcrumbContainer>
          : null}
          <InnerContainer>
            {trip ? 
              <DoubleTitle>{trip.name}</DoubleTitle>
            : null} 
            {journals.length ? 
              <JournalList>
                {journals.map(journal => {
                  const date = format(journal.date, 'MM/DD/YYYY');
                  return (
                    <li key={journal.slug}>
                      <JournalLink to={`/${userSlug}/${trip.slug}/${journal.slug}`}>
                        <Card name={journal.title} subtext={date}/>                    
                      </JournalLink>
                    </li>
                )})}
              </JournalList>
              : <p>{status}</p>}
          </InnerContainer>
        </ContentContainer>
        <Footer />
      </React.Fragment>
    )
  }
}

export default Journal;