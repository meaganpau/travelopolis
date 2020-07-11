import React, { Component } from "react"
import { Route } from "react-router-dom"
import JournalList from "../pages/JournalList"
import JournalSingle from "../pages/JournalSingle"

class Journals extends Component {
    state = {
        tripSlug: "",
        userSlug: "",
    }

    componentDidMount() {
        const { userSlug, trip } = this.props.match.params
        this.setState({
            tripSlug: trip,
            userSlug,
        })
    }

    render() {
        const { tripSlug, userSlug } = this.state

        return (
            <>
                <Route
                    exact
                    path={`/${userSlug}/${tripSlug}`}
                    component={(props) => (
                        <JournalList
                            userSlug={userSlug}
                            tripSlug={tripSlug}
                            {...props}
                        />
                    )}
                />
                <Route
                    path={`/${userSlug}/${tripSlug}/:journal`}
                    component={(props) => (
                        <JournalSingle
                            trip={tripSlug}
                            userSlug={userSlug}
                            {...props}
                        />
                    )}
                />
            </>
        )
    }
}

export default Journals
