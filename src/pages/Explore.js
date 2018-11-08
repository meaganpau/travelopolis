import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'react-emotion';
import axios from 'axios';
import Header from '../components/Header';
import InnerContainer from '../components/InnerContainer'
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

const JournalLink = styled(MyLink)`
    text-decoration: none;
`

class Explore extends Component {
    state = {
        journals: [],
        status: 'Loading...',
    }

    componentDidMount() {
        this.getJournals(9);
    }

    getJournals = async qty => {
        try {
            const res = await axios.get(`/api/journals/${qty}`)
            this.setState({ journals: res.data })
        } catch(e) {
            console.log(e);
            this.setState({ status: 'Error getting users' })
        }
    }

    render() {
        const { journals } = this.state;
        return(
            <React.Fragment>
                <Header/>
                <InnerContainer>
                    <DoubleTitle>Explore</DoubleTitle>
                    {journals.length > 0 ? 
                        <JournalList>
                            {journals.map(journal =>
                                <li key={journal._id}>
                                    <JournalLink to={`/${journal.trip.user.slug}/${journal.trip.slug}/${journal.slug}`}>
                                        <Card name={journal.title} subtext={`By: ${journal.trip.user.firstName} ${journal.trip.user.lastName}`}/>
                                    </JournalLink>
                                </li>
                            )}
                        </JournalList>
                    : null
                    }
                </InnerContainer>
                <Footer/>
            </React.Fragment>
        )
    }
}

export default Explore;
