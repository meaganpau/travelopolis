import React from "react";
import { Route } from 'react-router-dom';
import GetJournals from "../pages/list_journals";
import JournalSingle from "../routes/journal_single";

const Journals = props => {
  const tripSlug = props.match.params.trip;
  
  return (
    <div>
        <Route exact path={`/${tripSlug}`} render={props => <GetJournals slug={tripSlug}/>}/>
        <Route path={`/${tripSlug}/:journal`} render={props => <JournalSingle trip={tripSlug} {...props} />}/>
    </div>
  )
}

export default Journals;