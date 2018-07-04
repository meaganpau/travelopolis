import React, { Component } from "react";
import { Route } from 'react-router-dom';
import GetJournals from "../components/JournalList";
import JournalSingle from "../pages/JournalSingle";

class Journals extends Component {
  state = {
    tripSlug: null,
    userSlug: null
  }

  componentDidMount() {
    const { userSlug, trip } = this.props.match.params;
    this.setState({
      tripSlug: trip,
      userSlug
    })
  }
  
  render() {
    const { tripSlug, userSlug } = this.state;

    return (
      <div>
          <Route exact path={`/${userSlug}/${tripSlug}`} component={GetJournals}/>
          <Route path={`/${userSlug}/${tripSlug}/:journal`} component={props => <JournalSingle trip={tripSlug} userSlug={userSlug} {...props} />}/>
      </div>
    )
  }
}

export default Journals;