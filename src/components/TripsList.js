import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import styled from 'react-emotion';
import axios from 'axios';
import Card from './Card';

const MyLink = ({...props}) => <Link {...props}>{props.children}</Link>;

const JournalLink = styled(MyLink)`
    text-decoration: none;
`

const TripList = styled('ul')`
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

class Trip extends Component {
    state = {
        trips: '',
        status: 'Loading...',
    };  
  
    getTrips = async userID => {
      try {
        const res = await axios.get(`/api/trips/user/${userID}`)
        if (res.data.length) {
          this.setState({ trips: res.data });
        } else {
          this.setState({ status: 'No trips found.' });
        }
      } catch(e) {
        console.log(e);
        this.setState({ status: 'Error loading trips.' });
      }
    } 

    componentDidMount() {
        this.getTrips(this.props.userId)
    }

    render() {
        const { trips, status } = this.state;
        const { userSlug } = this.props;
        return (
            <TripList>
                {trips ?
                    trips.map(trip => {
                        const date = format(trip.date, 'MM/DD/YYYY');
                        return (
                        <li key={trip.slug}>
                            <JournalLink to={`/${userSlug}/${trip.slug}`}>
                                <Card name={trip.name} subtext={date}/>
                            </JournalLink>
                        </li>
                    )}) 
                : `${status}`}
            </TripList>
        )
    }
};

export default Trip;
