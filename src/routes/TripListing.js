import React from "react";
import { Route } from 'react-router-dom';
import GetTrips from "../components/TripsList";
import JournalListing from "../routes/JournalListing";

const Trips = () => (
    <div>
        <Route exact path='/:userSlug' component={GetTrips}/>
        <Route path='/:userSlug/:trip' component={JournalListing}/>
    </div>
)

export default Trips;
