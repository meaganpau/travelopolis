import React from "react";
import { Route } from 'react-router-dom';
import JournalPage from "../pages/single_journal";

const Journals = props => {
  const tripSlug = props.trip;
  const journalSlug = props.match.params.journal;
  
  return (
    <div>
        <Route exact path={`/${tripSlug}/${journalSlug}`} render={props => <JournalPage trip={tripSlug} journal={journalSlug}/>}/>
    </div>
  )
}

export default Journals;