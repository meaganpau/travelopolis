import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TripListing from "./routes/trips_listing";
import Trip from "./routes/journal_listing";
import JournalPage from "./pages/journal_page";
import LoginPage from './pages/login_page';

class App extends Component {
  state = {
      userLoggedIn: true,
  };

  login = () => {
    this.setState({ userLoggedIn: true });
  }

  getHomePage = () => {
    return this.state.userLoggedIn ? <TripListing /> : <LoginPage handleChange={this.login}/>;
  }

  render() {
    return (
      <Router>
          <Switch>
            <Route exact path="/" render={props => this.getHomePage()}/>
            <Route path={'/:trip'} component={Trip}/>
            <Route path={'/:trip/:journal'} component={JournalPage}/>
          </Switch>  
      </Router>
    );
  }
}

export default App;