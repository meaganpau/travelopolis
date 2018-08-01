import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TinyMCE from '../../components/TinyMCE';
import DoubleTitle from '../../components/DoubleTitle';
import { getToken } from '../../services/tokenServices'

class AddTrip extends Component {
    state = {
        user: {},
        title: '',
        slug: '',
        content: '',
        trip: '',
        trips: [],
        status: '', 
        newJournal: {},
        newJournalURL: ''
    }

    handleFormSubmit = e => {
        e.preventDefault();
        const { trip } = this.state;
        if (!trip) {
            this.setState({trip: document.getElementById('select-trip').value }, () => {
                this.addJournal();
            })
        } else {
            this.addJournal();
        }
    }
    
    async addJournal() {
        const { user, title, slug, content, trip } = this.state;
        const token = getToken('userToken');
        if (token) {
            try { 
                const res = await axios.post('/api/journals', {
                    user,
                    title,
                    slug,
                    content,
                    trip
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (res.data.errors || res.data.errmsg) {
                    this.setState({ status: res.data.message });
                } else {
                    this.setState({
                        newJournal: res.data, 
                        status: 'New journal created!'
                    })
                    this.getJournalURL();
                }
            
            } catch (e) {
                console.log(e);
                this.setState({ status: 'Error creating journal.' });
            }
        }
    }
    
    async getJournalURL() {
        const { newJournal, user, trip } = this.state;
        const token = getToken('userToken');
        if (token) {
            try {
                const res = await axios.get(`/api/trips/id/${trip}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                this.setState({
                    newJournalURL: `/${user.slug}/${res.data.slug}/${newJournal.slug}`
                });
            } catch (e) {
                console.log(e);
                this.setState({ status: 'An error occurred.' });
            }
        }
    }

    componentDidMount() {
        const { user, location } = this.props;
        this.setState({ user: user, trip: location.state }, () => {
            this.getTrips(this.state.user._id)
        })
    }

    getTrips = async userID => {
        try {
            const res = await axios.get(`/api/trips/user/${userID}`)
            if (res.data.length) {
              this.setState({ trips: res.data });
            } else {
              this.setState({ status: 'No trips found.' });
            }
        } catch (e) {
            console.log(e);
            this.setState({ status: 'Error loading trips.' });
        }
      } 

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ 
            [name]: value
        })
    }

    handleEditorChange = content => {
        this.setState({ content });
    }

    createSelectItems = trips =>
        trips.map(trip => 
            <option key={trip._id} value={trip._id}>
                {trip.name}
            </option>
        )
   
    onDropdownSelected = e => {
        this.setState({ trip: e.target.value })
    }

    render() {
        const { trips, status, newJournalURL, title, content, trip } = this.state;
        return(
            <React.Fragment>
                <DoubleTitle>Create Journal</DoubleTitle>
                {status ? 
                    <div>
                        <p>{status}</p>
                        {newJournalURL ? <Link to={`${newJournalURL}`}>View Journal > {title}</Link>: null}
                    </div>
                    :
                    <form onSubmit={this.handleFormSubmit}>
                        { trips ?
                            <select id="select-trip" onChange={this.onDropdownSelected} label="Select Trip" value={trip ? trip : trips[0]}>
                                {this.createSelectItems(trips)}
                            </select>
                        : null }
                        <label for="title">Title</label>
                        <input type="text" onChange={this.handleChange} name="title" id="title"/>
                        <label for="slug">Slug</label>
                        <input type="text" onChange={this.handleChange} name="slug" id="slug"/>
                        <TinyMCE value={content} onEditorChange={this.handleEditorChange}/>
                        <input type="submit" value="Save"/>
                    </form>
                }
            </React.Fragment>
        )
    }
}

export default AddTrip