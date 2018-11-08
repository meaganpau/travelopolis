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
        fieldError: '',
        newUser: ''
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
                newUser: res.data, 
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
                        <label htmlFor="firstName">First Name<span>*</span></label>
                        <input type="text" onChange={this.handleChange} name="firstName" id="firstName" maxLength="50" required />
                        <label htmlFor="lastName">Last Name<span>*</span></label>
                        <input type="text" onChange={this.handleChange} name="lastName" id="lastName" maxLength="50" required />
                        <label htmlFor="email">Email address<span>*</span></label>
                        <input type="email" onChange={this.handleChange} name="email" id="email" className={fieldError === 'email' ? 'field-error' : ''} maxLength="50" required />
                        <label htmlFor="password">Password<span>*</span></label>
                        <input type="password" onChange={this.handleChange} name="password" id="password" maxLength="50" required />
                        <label htmlFor="slug">Slug<span>*</span></label>
                        <input type="text" onChange={this.handleChange} name="slug" id="slug" maxLength="50" required />
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
