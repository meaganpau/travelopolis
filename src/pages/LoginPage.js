import React, { Component } from 'react';
import axios from 'axios';
import Menu from '../components/Menu';
import { setToken } from '../services/tokenServices';

class LoginPage extends Component {
    state = {
        email: '',
        password: ''
    }

    handleSubmit = async e => {
        e.preventDefault();
        const { email, password } = this.state;
        try {
            const res = await axios.post('/api/login', { email, password });
            setToken('userToken', res.data.token);
            this.props.getCurrentUser();
        } catch (e) {
            console.log(e);
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
                <Menu />
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="email" placeholder="Email" name="email" onChange={this.handleChange}/>
                    <input type="password" placeholder="Password" name="password" onChange={this.handleChange}/>
                    <input type="submit" value="Login" />
                </form>
            </React.Fragment>
        )
    }
}

export default LoginPage;