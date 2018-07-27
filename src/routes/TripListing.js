import React from "react";
import { Route } from 'react-router-dom';
import GetTrips from "../components/TripsList";
import JournalListing from "../routes/JournalListing";

const Trips = () => (
    <React.Fragment>
        <Route exact path=':userSlug' component={GetTrips}/>
        <Route path=':userSlug/:trip' render={props => <JournalListing {...props}/>}/>
    </React.Fragment>
)

export default Trips;
