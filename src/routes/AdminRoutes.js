import React from "react";
import { Route } from 'react-router-dom';
import AdminAddTrip from '../pages/cms/AddTrip';
import AdminAddJournal from '../pages/cms/AddJournal';
import AdminUser from '../pages/cms/User';
import AdminTrip from '../pages/cms/AdminTrips';
import AdminJournal from '../pages/cms/UpdateJournal';
import Admin from '../pages/cms/Admin';
import Header from '../components/Header';
import AdminContentContainer from '../components/cms/AdminContentContainer';

const AdminRoutes = props => {
    const { user, setUser } = props;
    return (
        <React.Fragment>
            <Header user={user} setUser={setUser}/>
            <AdminContentContainer>
                <Route exact path='/admin' render={appProps => <Admin user={user} {...appProps} />}/>
                <Route exact path={'/admin/add_trip'} render={appProps => <AdminAddTrip user={user} {...appProps} /> } />      
                <Route exact path={'/admin/add_journal'} render={appProps => <AdminAddJournal user={user} {...appProps} /> } />      
                <Route exact path={'/admin/trip/:trip'} render={appProps => <AdminTrip user={user} {...appProps} /> } /> 
                <Route exact path={'/admin/journal/:journal'} render={appProps => <AdminJournal user={user} {...appProps} /> } />
                <Route exact path={'/admin/user/:user'} render={appProps => <AdminUser user={user} {...appProps} /> } />
            </AdminContentContainer>
        </React.Fragment>
    )
}

export default AdminRoutes;