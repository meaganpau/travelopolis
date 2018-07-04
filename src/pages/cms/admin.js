import React, { Component } from 'react';
import Trips from './Trips';
import { Link } from 'react-router-dom';

class Admin extends Component {
    state = {
        user: null
    }
    
    componentDidMount() {
        this.setState({ user: this.props.user })
    }

    render() {
        return (
            <div>
                { this.state.user ? <Trips user={this.state.user}/> : <div><p>Please log in</p><Link to={'/login'}>Login</Link></div> }
            </div>
        )
    }
}

export default Admin;