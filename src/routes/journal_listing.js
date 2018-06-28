import React, { Component } from "react";
import { Route } from 'react-router-dom';
import GetJournals from "../components/list_journals";
import JournalSingle from "../routes/journal_single";

class Journals extends Component {
  state = {
    tripSlug: null,
    userSlug: null
  }

  componentDidMount() {
    const location = this.props.location.pathname;
    const userSlug = location.split("/")[1];
    const tripSlug = location.split("/")[2];
    this.setState({
      tripSlug,
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