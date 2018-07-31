import React, { Component } from 'react';
import Trips from './Trips';
import LogoutButton from '../../components/LogoutButton'

class Admin extends Component {
    state = {
        user: {},
        deleted: ''
    }
    
    componentDidMount() {
        if (this.props.location.hasOwnProperty('deleted')) {
            const { deleted } = this.props.location;
            this.setState({
              deleted: `"${deleted}" and relateed journals have been deleted.`
            })
          }
        this.setState({ user: this.props.user })
    }

    render() {
        const { user, deleted } = this.state;
        return (
            <div>
                { Object.keys(user).length ? 
                    <React.Fragment>
                        <h1>Hello, {user.firstName}!</h1>
                        <Trips user={user}/>
                    </React.Fragment>
                    : null
                }
                {deleted ? <p>{deleted}</p> : null}
                <LogoutButton setUser={this.props.setUser} />
            </div>
        )
    }
}

export default Admin;
