import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginPage = props => {
    const userLogin = () => {
        // axios.post('/api/login')
        axios.get('/api/users')
        .then(res => {
          if (res.status === 200) {
            props.handleChange(res.data);
          }
        })
        .catch(e => {
          console.log(e);
        })
    } 

    return(
        <div>
            <h1>Login</h1>
            <button onClick={userLogin}>Login</button>
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/register'}>Register</Link></li>            
        </div>
    )
}

export default LoginPage;