import React from 'react';
import axios from 'axios';
import Menu from '../components/menu';

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
            <Menu />
            <h1>Register</h1>
            <button onClick={userLogin}>Register</button>
        </div>
    )
}

export default LoginPage;