import React from 'react';
import axios from 'axios';
import Menu from '../components/Menu';

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
            <Menu />
            <h1>Login</h1>
            <button onClick={userLogin}>Login</button>   
        </div>
    )
}

export default LoginPage;