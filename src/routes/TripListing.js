import React from "react";
import { Route } from 'react-router-dom';
import TripsList from "../pages/Trips";
import JournalListing from "../routes/JournalListing";

const Trips = () => (
    <React.Fragment>
        <Route exact path='/:userSlug' component={TripsList}/>
        <Route path='/:userSlug/:trip' component={JournalListing}/>
    </React.Fragment>
)

export default Trips;
