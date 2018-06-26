import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginPage = props => {
    const userLogin = () => {
        // axios.post('/api/login')
        axios.get('/api/users')
        .then(res => {
          if (res.status === 200) {
            // props.handleChange(res);
          }
        })
        .catch(e => {
          console.log(e);
        })
    } 

    return(
        <div>
            <h1>Register</h1>
            <button onClick={userLogin}>Register</button>
            <li><Link to={'/login'}>Login</Link></li>
            <li><Link to={'/explore'}>Explore</Link></li>
        </div>
    )
}

export default LoginPage;