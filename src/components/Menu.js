import React from "react";
import { Link } from 'react-router-dom';

const Menu = () => (
    <ul>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/login'}>Login</Link></li>
        <li><Link to={'/register'}>Register</Link></li>
        <li><Link to={'/explore'}>Explore</Link></li>
    </ul>
)

export default Menu;
