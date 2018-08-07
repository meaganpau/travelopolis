import React from "react";
import { Route, Redirect } from 'react-router-dom';
import AdminAddTrip from '../pages/cms/AddTrip';
import AdminAddJournal from '../pages/cms/AddJournal';
import AdminUser from '../pages/cms/User';
import AdminTrip from '../pages/cms/AdminTrip';
import AdminJournal from '../pages/cms/UpdateJournal';
import Admin from '../pages/cms/Admin';
import Header from '../components/Header';
import InnerContainer from '../components/InnerContainer';
import { AppContext } from "../AppContext"

const AdminRoutes = () =>
    <AppContext.Consumer>
        {context => {
            return(
                context.user && context.isAuthenticated ? 
                    <React.Fragment>
                        <Header />
                        <InnerContainer>
                            <Route exact path='/admin' component={Admin} />
                            <Route exact path='/admin/add_trip' render={props => <AdminAddTrip user={context.user} {...props}/> } /> 
                            <Route exact path='/admin/add_journal' render={props => <AdminAddJournal user={context.user} {...props}/> } /> 
                            <Route exact path='/admin/trip/:trip' component={AdminTrip} /> 
                            <Route exact path='/admin/journal/:journal' component={AdminJournal} />
                            {/* <Route exact path='/admin/user/:user' component={AdminUser} /> */}
                        </InnerContainer>
                    </React.Fragment>
                : 
                <Redirect to='/' />
            )
        }}
    </AppContext.Consumer>

export default AdminRoutes;