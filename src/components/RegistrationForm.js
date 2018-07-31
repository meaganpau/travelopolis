import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'react-emotion';

const SuccessMessage = styled('p')`
    margin-bottom: 35px;
`

class Register extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        slug: '',
        status: '',
        error: '',
        fieldError: ''
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
            this.setState({ 
                newUser: res.data.email, 
                status: 'Registered successfully!'
            });
        } catch (e) {
            console.log(e);
            this.setState({ 
                error: e.response.data.message,
                fieldError: e.response.data.field
            })
        }
    }

    render() {
        const { status, newUser, error, fieldError } = this.state;
        return(
            <React.Fragment>
                <h1>Register</h1>
                { status ? 
                    <SuccessMessage>{ status }</SuccessMessage>
                    : null
                }
                { !newUser ? 
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" onChange={this.handleChange} name="firstName" id="firstName" required />
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" onChange={this.handleChange} name="lastName" id="lastName" required />
                        <label htmlFor="email">Email address</label>
                        <input type="email" onChange={this.handleChange} name="email" id="email" className={fieldError === 'email' ? 'field-error' : ''}required />
                        <label htmlFor="password">Password</label>
                        <input type="password" onChange={this.handleChange} name="password" id="password" required />
                        <label htmlFor="slug">Slug</label>
                        <input type="text" onChange={this.handleChange} name="slug" id="slug" required />
                        <input type="submit" value="Register" className="btn-main" />
                        { error ? 
                            <p className="error">{ error }</p>
                            : null
                        }
                        <Link to="/" className="underline-link">Back to login</Link>
                    </form>
                : 
                    <Link to="/" className="btn-main">Login here</Link>                        
                }
            </React.Fragment>
        )
    }
}

export default Register;
