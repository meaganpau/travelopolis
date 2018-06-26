import React from "react";
import { Route } from 'react-router-dom';
import GetTrips from "../pages/list_trips";
import JournalListing from "../routes/journal_listing";

const Trips = () => (
    <div>
        <Route exact path='/' component={GetTrips}/>
        <Route path='/:trip' component={JournalListing}/>
    </div>
)

export default Trips;
