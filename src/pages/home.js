import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <div>
        <h1>Home Page</h1>
        <ul>
            <li><Link to={'/login'}>Login</Link></li>
            <li><Link to={'/register'}>Register</Link></li>
            <li><Link to={'/explore'}>Explore</Link></li>
        </ul>
    </div>
)

export default Home;
