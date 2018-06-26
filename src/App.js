import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TripListing from "./routes/trips_listing";
import Trip from "./routes/journal_listing";
import JournalSingle from "./routes/journal_single";
import LoginPage from './pages/login_page';
import Admin from './pages/cms/admin';

class App extends Component {
  state = {
      user: null,
  };

  login = user => {
    this.setState({ user: user.data });
    console.log(this.state.user);
  }

  getHomePage = () => {
    return this.state.user ? <TripListing /> : <LoginPage handleChange={this.login}/>;
  }

  render() {
    return (
      <Router>
          <Switch>
            <Route exact path="/" render={props => this.getHomePage()}/>
            <Route path={'/admin'} render={props => <Admin user={this.state.user} {...props} /> } />      
            <Route path={'/:trip'} component={Trip}/>
            <Route path={'/:trip/:journal'} component={JournalSingle}/>
          </Switch>  
      </Router>
    );
  }
}

export default App;