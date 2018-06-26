import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from './pages/login_page';
import Homepage from './pages/home';
import Explore from './pages/explore';
import Register from './pages/register';
import TripListing from "./routes/trips_listing";
import Trip from "./routes/journal_listing";
import JournalSingle from "./routes/journal_single";
import AdminAddTrip from './pages/cms/add_trip';
import AdminAddJournal from './pages/cms/add_journal';
import AdminUser from './pages/cms/admin_user';
import Admin from './pages/cms/admin';
import AdminTrip from './routes/cms/admin_trips';
import AdminJournal from './routes/cms/admin_journal';

class App extends Component {
  state = {
      user: null,
  };

  login = user => {
    // temporary: get first user in user list 
    this.setState({ user: user[1] });
  }

  getHomePage = () => {
    // return this.state.user ? <TripListing user={this.state.user._id}/> : <LoginPage handleChange={this.login}/>;
  }

  render() {
    return (
      <Router>
          <Switch>
            <Route exact path="/" component={Homepage}/>
            <Route path="/login" render={() => (
              this.state.user ? (
                <Redirect to={{pathname: '/admin', state: { user: this.state.user }}} />
              ) : (
                <LoginPage handleChange={this.login}/>)
            )}/>
            <Route path={'/explore'} component={Explore} />      
            <Route path={'/register'} component={Register} />      
            <Route path={'/admin'} render={props => <Admin user={this.state.user} {...props} /> } />      
            <Route path={'/admin/add_trip'} render={props => <AdminAddTrip user={this.state.user} {...props} /> } />      
            <Route path={'/admin/add_journal'} render={props => <AdminAddJournal user={this.state.user} {...props} /> } />      
            <Route path={'/admin/:trip'} render={props => <AdminTrip user={this.state.user} {...props} /> } /> } />      
            <Route path={'/admin/:journal'} render={props => <AdminJournal user={this.state.user} {...props} /> } /> } />      
            <Route path={'/admin/:user'} render={props => <AdminUser user={this.state.user} {...props} /> } /> } />      
            <Route path={'/:userSlug'} component={TripListing}/>
            <Route path={'/:userSlug/:trip'} component={Trip}/>
            <Route path={'/:userSlug/:trip/:journal'} component={JournalSingle}/>
          </Switch>  
      </Router>
    );
  }
}

export default App;