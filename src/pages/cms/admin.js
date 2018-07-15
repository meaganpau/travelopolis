import React, { Component } from 'react';
import Trips from './Trips';
import LogoutButton from '../../components/LogoutButton'

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
                { this.state.user ? 
                    <React.Fragment>
                        <h1>Hello {this.state.user.firstName}</h1>
                        <Trips user={this.state.user}/>
                    </React.Fragment>
                    : null
                }
                <LogoutButton setUser={this.props.setUser} />
            </div>
        )
    }
}

export default Admin;