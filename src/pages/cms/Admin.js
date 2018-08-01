import React, { Component } from 'react';
import Trips from './Trips';

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
            <React.Fragment>
                { Object.keys(user).length ? 
                    <Trips user={user}/>
                    : null
                }
                {deleted ? <p>{deleted}</p> : null}
            </React.Fragment>
        )
    }
}

export default Admin;
