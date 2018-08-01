import React, { Component } from 'react';
import Header from '../components/Header';
import ContentContainer from '../components/ContentContainer'
import JournalCard from '../components/JournalCard';
import DoubleTitle from '../components/DoubleTitle';
import axios from 'axios';

class Explore extends Component {
    state = {
        journals: [],
        status: 'Loading...',
        user: null
    }

    componentDidMount() {
        if (this.props.user) {
            this.setState({ user: this.props.user })
        }
        this.getJournals(10);
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
        const { journals, user } = this.state;
        return(
            <React.Fragment>
                <Header user={user}/>
                <ContentContainer>
                    <DoubleTitle>Explore</DoubleTitle>
                    {journals.length > 0 ? 
                        <ul>
                            {journals.map(journal => <JournalCard {...journal} key={journal._id} />)}
                        </ul>
                    : null
                    }
                </ContentContainer>
            </React.Fragment>
        )
    }
}

export default Explore;
