import React from 'react';
import axios from 'axios';

const LoginPage = props => {
    const userLogin = () => {
        axios.get('/api/login')
        .then(res => {
          if (res.status === 200) {
            props.handleChange(res);
          }
        })
        .catch(e => {
          console.log(e);
        })
    } 

    return(
        <div>
            <button onClick={userLogin}>Login</button>
        </div>
    )
}

export default LoginPage;