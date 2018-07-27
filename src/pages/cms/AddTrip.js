import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getToken } from '../../services/tokenServices'

class AddTrip extends Component {
    state = {
        user: {},
        name: '',
        slug: '',
        status: '',
        newTrip: {},
        newTripURL: ''
    }

    handleSubmit = async e => {
        e.preventDefault();
        const token = getToken('userToken');
        const { user, name, slug } = this.state;
        try { 
            const res = await axios.post('/api/trips', {
                user,
                name,
                slug
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res.data.errors || res.data.errmsg) {
                this.setState({ status: res.data.message });
            } else {
                this.setState({
                    newTrip: res.data, 
                    status: 'New Trip created!',
                    newTripURL: `/${user.slug}/${res.data.slug}`
                })
            }
        } catch(e) {
            console.log(e);
        }
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
        const { name, status, newTripURL, newTrip } = this.state;

        return(
            <div>
                {status ? 
                    <React.Fragment>
                        <Link to={{ pathname: '/admin/add_journal', state: newTrip._id }}>Add Journal</Link>
                        <Link to='/admin'>Back to Admin</Link>
                        <p>{status}</p>                 
                        { newTripURL ? <Link to={`${newTripURL}`}>View {name}</Link>: null }
                    </React.Fragment>
                    :
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" onChange={this.handleChange} placeholder="Trip Name" name="name"/>
                        <input type="text" onChange={this.handleChange} placeholder="Trip Slug" name="slug"/>
                        <input type="submit" value="Create Trip"/>                        
                    </form>
                }
            </div>
        )
    }
}

export default AddTrip