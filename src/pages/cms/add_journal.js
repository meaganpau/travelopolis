import React, { Component } from 'react';
import axios from 'axios';

class AddTrip extends Component {
    state = {
        user: null,
        title: null,
        slug: null,
        content: null,
        trip: null,
        trips: null,
        status: null
    }

    handleFormSubmit = () => {
        //fix default select value not working
        const { user, title, slug, content, trip } = this.state;
        axios.post('/api/journals', {
            user,
            title,
            slug,
            content,
            trip
        })
        .then(res => {
            console.log('then res', res);
            // do a thing
        })
        .catch(e => {
            console.log(e);
        })
    }

    componentDidMount() {
        this.setState({ user: this.props.user._id }, () => {
            this.getTrips(this.state.user)
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

    createSelectItems = trips => 
        trips.map(
            trip => 
                <option key={trip._id} value={trip._id}>
                    {trip.name}
                </option>)
   
    onDropdownSelected = e => {
        this.setState({ trip: e.target.value })
    }

    render() {
        const { trips } = this.state;
        return(
            <div>
                {trips ?
                    <select onChange={this.onDropdownSelected} label="Select Trip">
                        {this.createSelectItems(trips)}
                    </select>
                : null }
                <input onChange={this.handleChange} placeholder="Title" name="title"/>
                <input onChange={this.handleChange} placeholder="Slug" name="slug"/>
                <textarea onChange={this.handleChange} placeholder="Content" name="content"/>
                <button onClick={this.handleFormSubmit}>Create Journal</button>
            </div>
        )
    }
}

export default AddTrip