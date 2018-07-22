import React, { Component } from 'react';
import axios from 'axios';
import Menu from '../components/Menu';
import { setToken } from '../services/tokenServices'

class Register extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        slug: '',
        status: ''
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ 
            [name]: value
        })
    }

    handleSubmit = async e => {
        e.preventDefault();
        const { email, password, firstName, lastName, slug } = this.state;

        try {
            const res = await axios.post('/api/users', {
                email,
                password,
                firstName,
                lastName,
                slug
            })
            setToken('userToken', res.data.token);
            this.props.setUser(res.data);
            this.setState({ 
                newUser: res.data.email, 
                status: 'Registered successfully!'
            });
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const { status, newUser } = this.state;
        return(
            <div>
                <Menu />
                <h1>Register</h1>
                { status ? 
                    <div>
                        <p>{status}</p>
                        <p>{newUser}</p>
                    </div> : 
                    <form onSubmit={this.handleSubmit}>
                        <input type="email" onChange={this.handleChange} placeholder="Email" name="email"/>
                        <input type="text" onChange={this.handleChange} placeholder="First Name" name="firstName"/>
                        <input type="text" onChange={this.handleChange} placeholder="Last Name" name="lastName"/>
                        <input type="password" onChange={this.handleChange} placeholder="Password" name="password"/>
                        <input type="text" onChange={this.handleChange} placeholder="Slug" name="slug"/>
                        <input type="submit" value="Register"/>
                    </form>
                }
            </div>
        )
    }
}

export default Register;