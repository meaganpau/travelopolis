import React, { Component } from 'react';
import Menu from '../components/menu';
import JournalCard from '../components/journal_card';
import axios from 'axios';

// show cards of journals with username and trip name

class Explore extends Component {

    state = {
        journals: null,
        users: null,
        status: 'Loading...'
    }

    componentDidMount() {
        // this.getUsers();
        this.getJournals(30);
    }

    // componentDidUpdate() {
    //     if (this.state.journals) {

    //     }
    // }
    
    getJournals = qty => {
        axios.get(`/api/journals/${qty}`)
            .then(res => {
                this.setState({ journals: res.data })
            })
            .catch(e => {
                console.log(e);
                this.setState({ status: 'Error getting users' })
            })
    }

    render() {
        const { journals } = this.state;
        return(
            <div>
                <Menu />
                <h1>Explore</h1>
                {journals ? 
                    <ul>
                        {journals.map(journal => <JournalCard journal={...journal}/>)}
                    </ul>
                : null
                }
            </div>
        )
    }
}

export default Explore;
