import React, { Component } from "react";
import { Route } from 'react-router-dom';
import GetJournals from "../pages/cms/admin_trips";
// import JournalSingle from "./admin_journal_single";

class Journals extends Component {
  state = {
    tripSlug: null,
    userSlug: null
  }

  componentDidMount() {
    console.log('routes/cms/admin_trips');
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
          <Route exact path={`/admin/trip/:trip`} component={GetJournals}/>
          {/* <Route path={`/admin/trip/:trip`} component={props => <JournalSingle trip={tripSlug} userSlug={userSlug} {...props} />}/> */}
      </div>
    )
  }
}

export default Journals;