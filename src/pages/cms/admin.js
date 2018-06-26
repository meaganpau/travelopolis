import React, { Component } from 'react';
import Trips from './trip_listing';

class Admin extends Component {
    state = {
        user: null
    }
    
    componentDidMount() {
        console.log(this.props);
    }

    render() {
        return (
            <div>
                { this.state.user ? <Trips /> : <p>Please log in</p> }
            </div>
        )
    }
}

export default Admin;