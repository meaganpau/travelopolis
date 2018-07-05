import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TinyMCE from '../../components/TinyMCE';

class AddTrip extends Component {
    state = {
        user: null,
        title: '',
        slug: '',
        content: '',
        trip: null,
        trips: null,
        status: '', 
        newJournal: null,
        newJournalURL: ''
    }

    handleFormSubmit = () => {
        const { trip } = this.state;
        if (!trip) {
            this.setState({trip: document.getElementById('select-trip').value }, () => {
                this.addJournal();
            })
        } else {
            this.addJournal();
        }
    }
    
    addJournal() {
        const { user, title, slug, content, trip } = this.state;

        axios.post('/api/journals', {
            user,
            title,
            slug,
            content,
            trip
        })
        .then(res => {
            if (res.data.errors || res.data.errmsg) {
                this.setState({ status: res.data.message });
            } else {
                this.setState({
                    newJournal: res.data, 
                    status: 'New journal created!'
                })
                this.getJournalURL();
            }
        })
        .catch(e => {
            console.log(e);
            this.setState({ status: 'Error creating journal.' });
        })
    }
    
    getJournalURL = () => {
        const { newJournal, user, trip } = this.state;
        axios.get(`/api/trips/id/${trip}`)
            .then(res => {
                this.setState({
                    newJournalURL: `/${user.slug}/${res.data.slug}/${newJournal.slug}`
                });
            })
            .catch(e => {
                console.log(e);
                this.setState({ status: 'An error occurred.' });
            })
    }

    componentDidMount() {
        this.setState({ user: this.props.user }, () => {
            this.getTrips(this.state.user._id)
        })
    }

    getTrips = userID => {
        axios.get(`/api/trips/user/${userID}`)
          .then(res => {
            if (res.data.length) {
              this.setState({ trips: res.data });
            } else {
              this.setState({ status: 'No trips found.' });
            }
          })
          .catch(e => {
            console.log(e);
            this.setState({ status: 'Error loading trips.' });
          })
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
        trips.map( trip => 
            <option key={trip._id} value={trip._id}>
                {trip.name}
            </option>
        )
   
    onDropdownSelected = e => {
        this.setState({ trip: e.target.value })
    }

    render() {
        const { trips, status, newJournalURL, title, content } = this.state;
        return(
            <div>
                {status ? 
                    <div>
                        <p>{status}</p>
                        {newJournalURL ? <Link to={`${newJournalURL}`}>View Journal > {title}</Link>: null}
                    </div>
                    :
                    <div>
                        { trips ?
                            <select id="select-trip" onChange={this.onDropdownSelected} label="Select Trip">
                                {this.createSelectItems(trips)}
                            </select>
                        : null }
                        <input onChange={this.handleChange} placeholder="Title" name="title"/>
                        <input onChange={this.handleChange} placeholder="Slug" name="slug"/>
                        <TinyMCE value={content} onEditorChange={this.handleEditorChange} onFormSubmit={this.handleFormSubmit}/>
                    </div>
                }
            </div>
        )
    }
}

export default AddTrip