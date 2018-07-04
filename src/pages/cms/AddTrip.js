import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class AddTrip extends Component {
    state = {
        user: null,
        name: '',
        slug: '',
        status: '',
        newTrip: null,
        newTripURL: ''
    }

    handleClick = () => {
        const { user, name, slug } = this.state;
        axios.post('/api/trips', {
            user,
            name,
            slug
        })
        .then(res => {
            if (res.data.errors || res.data.errmsg) {
                this.setState({ status: res.data.message });
            } else {
                this.setState({
                    newTrip: res.data, 
                    status: 'New journal created!',
                    newTripURL: `/${user.slug}/${res.data.slug}`
                })
            }
        })
        .catch(e => {
            console.log(e);
        })
    }

    componentDidMount() {
        this.setState({ user: this.props.user })
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ 
            [name]: value
        })
    }

    render() {
        const { name, status, newTripURL } = this.state;

        return(
            <div>
                {status ? 
                    <div>
                        <p>{status}</p>
                        {newTripURL ? <Link to={`${newTripURL}`}>View Trip > {name}</Link>: null}
                    </div>
                    :
                    <div>
                        <input onChange={this.handleChange} placeholder="Trip Name" name="name"/>
                        <input onChange={this.handleChange} placeholder="Trip Slug" name="slug"/>
                        <button onClick={this.handleClick}>Create Trip</button>
                    </div>
                }
            </div>
        )
    }
}

export default AddTrip