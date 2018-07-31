import React from "react";
import { Link } from 'react-router-dom';

const Menu = () => (
    <ul>
        <li><Link to={'/'}>Login</Link></li>
        <li><Link to={'/register'}>Register</Link></li>
        <li><Link to={'/explore'}>Explore</Link></li>
    </ul>
)

export default Menu;
