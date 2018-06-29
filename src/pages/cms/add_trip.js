import React, { Component } from 'react';
import axios from 'axios';

class AddTrip extends Component {
    state = {
        user: null,
        name: null,
        slug: null
    }

    handleClick = () => {
        const { user, name, slug } = this.state;
        axios.post('/api/trips', {
            user,
            name,
            slug
        })
        .then(res => {
            console.log('then res', res);
            //do a thing
        })
        .catch(e => {
            console.log(e);
        })
    }

    componentDidMount() {
        this.setState({ user: this.props.user._id })
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ 
            [name]: value
        })
    }

    render() {
        return(
            <div>
                <input onChange={this.handleChange} placeholder="Trip Name" name="name"/>
                <input onChange={this.handleChange} placeholder="Trip Slug" name="slug"/>
                <button onClick={this.handleClick}>Create Trip</button>
            </div>
        )
    }
}

export default AddTrip