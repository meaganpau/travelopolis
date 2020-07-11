import React from "react"
import { Route } from "react-router-dom"
import TripsList from "../pages/Trips"
import JournalListing from "../routes/JournalListing"

const Trips = () => (
    <>
        <Route exact path="/:userSlug" component={TripsList} />
        <Route path="/:userSlug/:trip" component={JournalListing} />
    </>
)

export default Trips
