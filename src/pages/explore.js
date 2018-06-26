import React from 'react';
import { Link } from 'react-router-dom';

const Explore = () => (
    <div>
        <h1>Explore</h1>
        <ul>
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/login'}>Login</Link></li>
            <li><Link to={'/register'}>Register</Link></li>
        </ul>
    </div>
)

export default Explore;
