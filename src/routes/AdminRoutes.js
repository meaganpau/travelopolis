import React from "react";
import { Route, Redirect } from 'react-router-dom';
import AdminAddTrip from '../pages/cms/AddTrip';
import AdminAddJournal from '../pages/cms/AddJournal';
import AdminUser from '../pages/cms/User';
import AdminTrip from '../pages/cms/AdminTrips';
import AdminJournal from '../pages/cms/UpdateJournal';
import Admin from '../pages/cms/Admin';

const AdminRoutes = props => 
    <React.Fragment>
        <Route exact path='/admin' render={appProps => <Admin user={props.user} setUser={props.setUser} {...appProps} />}/>
        <Route exact path={'/admin/add_trip'} render={appProps => <AdminAddTrip user={props.user} {...appProps} /> } />      
        <Route exact path={'/admin/add_journal'} render={appProps => <AdminAddJournal user={props.user} {...appProps} /> } />      
        <Route exact path={'/admin/trip/:trip'} render={appProps => <AdminTrip user={props.user} {...appProps} /> } /> 
        <Route exact path={'/admin/journal/:journal'} render={appProps => <AdminJournal user={props.user} {...appProps} /> } />
        <Route exact path={'/admin/user/:user'} render={appProps => <AdminUser user={props.user} {...appProps} /> } />
    </React.Fragment>

export default AdminRoutes;