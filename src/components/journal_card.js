import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class JournalCard extends Component {
    state = {
        title: null,
        author_name: null,
        author_url: null,
        date: null,
        url: null
    }

    componentDidMount() {
        const { title, date, trip, slug } = this.props;
        this.setState({
            title,
            date,
            author_name: trip.user.firstName + ' ' + trip.user.lastName,
            author_url: trip.user.slug,
            trip: trip.name,
            url: trip.user.slug + '/' + trip.slug + '/' + slug
        })
    }

    render() {
        return(
            <li>
                <div className="journal-card">
                    {this.state.title ? 
                        <div>
                            <Link to={this.state.url}>
                                <h2>{this.state.title}</h2>
                            </Link>
                            <Link to={this.state.author_url}>
                            <h3>{this.state.author_name}</h3>
                            </Link>
                        </div>
                    : null }
                </div>
            </li>
        )
    }

}

export default JournalCard