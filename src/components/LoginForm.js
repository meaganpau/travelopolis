import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LoginForm extends Component {
    state = {
        email: '',
        password: '',
        status: ''
    }

    handleSubmit = async e => {
        e.preventDefault();
        const { email, password } = this.state;
        this.props.login(email, password);
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