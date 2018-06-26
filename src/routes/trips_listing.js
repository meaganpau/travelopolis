import React from "react";
import { Route } from 'react-router-dom';
import GetTrips from "../pages/list_trips";
import JournalListing from "../routes/journal_listing";

const Trips = () => (
    <div>
        <Route exact path='/:userSlug' component={GetTrips}/>
        <Route path='/:userSlug/:trip' render={props => <JournalListing {...props}/>}/>
    </div>
)

export default Trips;
