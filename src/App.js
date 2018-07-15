import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import LoginPage from './pages/LoginPage';
import Homepage from './pages/Home';
import Explore from './pages/Explore';
import Register from './pages/register';
import TripListing from "./routes/TripListing";
import AdminAddTrip from './pages/cms/AddTrip';
import AdminAddJournal from './pages/cms/AddJournal';
import AdminUser from './pages/cms/User';
import Admin from './pages/cms/Admin';
import AdminTrip from './routes/cms/AdminTrips';
import AdminJournal from './routes/cms/UpdateJournal';
import { getToken } from './services/tokenServices'

class App extends Component {
  state = {
    user: null,
    // user: {
    //   __v: 0,
    //   _id: "5b3128269c8098228a577b0f",
    //   email: "meagan.pau@gmail.com",
    //   firstName: "Meagan",
    //   lastName: "Pau",
    //   slug: "user1"
    // }
  };

  setUser = user => {
    this.setState({ user })
  }

  componentDidMount() {
    this.getCurrentUser();
  }

  getCurrentUser = async () => {
    const token = getToken('userToken');
    if (token) {
      try {
        const res = await axios.get('/api/users/current', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const user = res.data;
        this.setUser(user);
      } catch (e) {
        console.log(e);
      }
    }
  };

  render() {
    return (
      <Router>
          <Switch>
            <Route exact path="/" component={Homepage}/>
            <Route exact path="/login" render={() => (
              this.state.user ? (
                <Redirect to={{pathname: '/admin', state: { user: this.state.user }}} />
              ) : (
                <LoginPage getCurrentUser={this.getCurrentUser}/>)
            )}/>
            <Route exact path={'/explore'} component={Explore} />      
            <Route exact path={'/register'} render={() => <Register setUser={this.setUser}/>} />      
            <Route exact path={'/admin'} render={props => <Admin user={this.state.user} {...props} /> } />      
            <Route exact path={'/admin/add_trip'} render={props => <AdminAddTrip user={this.state.user} {...props} /> } />      
            <Route exact path={'/admin/add_journal'} render={props => <AdminAddJournal user={this.state.user} {...props} /> } />      
            <Route exact path={'/admin/trip/:trip'} render={props => <AdminTrip user={this.state.user} {...props} /> } /> 
            <Route exact path={'/admin/journal/:journal'} render={props => <AdminJournal user={this.state.user} {...props} /> } />
            <Route exact path={'/admin/user/:user'} render={props => <AdminUser user={this.state.user} {...props} /> } />
            <Route path={'/:userSlug'} component={TripListing}/>
          </Switch>  
      </Router>
    );
  }
}

export default App;