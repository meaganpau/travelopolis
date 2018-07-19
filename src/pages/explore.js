import React, { Component } from 'react';
import Menu from '../components/Menu';
import JournalCard from '../components/JournalCard';
import axios from 'axios';

// show cards of journals with username and trip name

class Explore extends Component {

    state = {
        journals: null,
        users: null,
        status: 'Loading...'
    }

    componentDidMount() {
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
        const { journals } = this.state;
        return(
            <div>
                <Menu />
                <h1>Explore</h1>
                {journals ? 
                    <ul>
                        {journals.map(journal => <JournalCard {...journal} key={journal._id} />)}
                    </ul>
                : null
                }
            </div>
        )
    }
}

export default Explore;
