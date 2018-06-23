import React from "react";
import { Route } from 'react-router-dom';
import GetJournals from "../components/list_journals";
import JournalPage from "../pages/journal_page";

const Journals = props => {
  const tripSlug = props.match.params.trip;
  
  return (
    <div>
        <Route exact path={`/${tripSlug}`} render={props => <GetJournals slug={tripSlug}/>}/>
        <Route path={`/${tripSlug}/:journal`} component={JournalPage}/>
    </div>
  )
}

export default Journals;