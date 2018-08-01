import React, { Component } from 'react';
import Trips from '../../components/cms/Trips';
import { AppContext } from "../../AppContext"

class Admin extends Component {
    state = {
        deleted: ''
    }
    
    componentDidMount() {
        if (this.props.location.hasOwnProperty('deleted')) {
            const { deleted } = this.props.location;
            this.setState({
                deleted: `"${deleted}" and relateed journals have been deleted.`
            })
        }
    }

    render() {
        const { deleted } = this.state;
        return (
            <React.Fragment>
                <AppContext.Consumer>
                    { context => {
                        return (
                            <Trips user={context.user} />
                        )
                    }}
                </AppContext.Consumer>
                { deleted ? <p>{deleted}</p> : null }
            </React.Fragment>
        )
    }
}

export default Admin;
