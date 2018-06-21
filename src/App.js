import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TripListing from "./pages/trips_listing";
import Trip from "./pages/trip";
import LoginPage from './pages/login_page';

class App extends Component {
  state = {
      userLoggedIn: true,
      userTrips: []
  };

  // componentDidMount() {
  //   this.checkUserLogin();
  // }
  
  getUserTrips = trips => {
    this.setState({ 
      userTrips: trips,
     });
  }

  login = () => {
    this.setState({ userLoggedIn: true });
  }

  getHomePage = () => {
    return this.state.userLoggedIn ? <TripListing handleGet={this.getUserTrips}/> : <LoginPage handleChange={this.login}/>;
  }

  render() {
    return (
      <Router>
          <div>
            <Route exact path="/" render={props => this.getHomePage()}/>
            { this.state.userTrips.map((trip) => (
              <Route path={`/${trip.slug}`} render={props => <Trip trip={trip}/>} key={trip.slug}/>
            ))}
          </div>  
      </Router>
    );
  }
}

export default App;