import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { setToken } from '../services/tokenServices';

class LoginForm extends Component {
    state = {
        email: '',
        password: '',
        status: ''
    }

    handleSubmit = async e => {
        e.preventDefault();
        const { email, password } = this.state;
        try {
            const res = await axios.post('/api/login', { email, password });
            setToken('userToken', res.data.token);
            await this.props.getCurrentUser();
            this.setState({ status: this.props.status })
        } catch (e) {
            const { status, data } = e.response;
            if (status !== 200) {
              this.setState({ status: data.err })
            }
        }
    } 

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ 
            [name]: value
        })
    }

    render() {
        return(
            <React.Fragment>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="email">Email address</label>
                    <input type="email" name="email" onChange={this.handleChange} id="email" required />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" onChange={this.handleChange} id="password" required />
                    <input type="submit" value="Sign in" className="btn-main"/>
                    {this.state.status ? <p className="error">{this.state.status}</p> : null}
                    <Link to="/forgot-password" className="underline-link">Forgot password?</Link>
                </form>
            </React.Fragment>
        )
    }
}

export default LoginForm;