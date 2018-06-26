import React, { Component } from "react";
import { Route } from 'react-router-dom';
import JournalPage from "../pages/single_journal";

class Journals extends Component {
  state = {
    userSlug: null,
    tripSlug: null,
    journalSlug: null
  }

  componentDidMount() {
    const { userSlug, trip, match } = this.props;
    this.setState({
      userSlug: userSlug,
      tripSlug: trip,
      journalSlug: match.params.journal
    })
  }
  
  render() {
    const { userSlug, tripSlug, journalSlug } = this.state;
    return (
      <div>
          <Route exact path={`/${userSlug}/${tripSlug}/${journalSlug}`} component={props => <JournalPage trip={tripSlug} user={userSlug} journal={journalSlug}/>}/>
      </div>
    )
  }
}

export default Journals;