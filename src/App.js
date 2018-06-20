import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { 
    BrowserRouter as Router, 
    Route, Link } from 'react-router-dom';
import Trips from "./pages/trips";
import home from './pages/home';
import trips from './pages/trips';

class App extends Component {
  // state = {
  //     userLoggedIn: false
  // };

  // componentDidMount() {
  //   this.checkUserLogin();
  // }

  render() {
    return (
      <Router>
          <div>
            <Route exact path="/" component={home} />
            <Route exact path="/trips" component={trips} />
          </div>
      </Router>
    );
  }
}

export default App;