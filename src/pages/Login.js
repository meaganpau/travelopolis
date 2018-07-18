import React, { Component } from 'react';
import axios from 'axios';
import Menu from '../components/Menu';

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    handleSubmit = e => {
        e.preventDefault();
        const { email, password } = this.state;
        axios.post('/api/login', {
            email,
            password
        })
        .then(res => {
          if (res.status === 200) {
            console.log(res);
          }
        })
        .catch(e => {
          console.log(e);
        })
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
                <Menu />
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="email" placeholder="Email" onChange={this.handleChange}/>
                    <input type="password" placeholder="Password" onChange={this.handleChange}/>
                    <input type="submit" value="Login" onChange={this.handleChange}/>
                </form>
            </div>
        )
    }
}

export default Login;