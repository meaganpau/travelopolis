import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import LoginPage from './pages/LoginPage';
import Homepage from './pages/Home';
import Explore from './pages/Explore';
import Register from './pages/Register';
import TripListing from "./routes/TripListing";
import AdminRoutes from "./routes/AdminRoutes";
import { getToken } from './services/tokenServices'

class App extends Component {
  state = {
    user: null,
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
        this.setUser(res.data.user);
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
            <Route exact path={'/register'} render={() => 
              this.state.user ? <Redirect to={{pathname: '/admin', state: { user: this.state.user }}} />
              : <Register setUser={this.setUser}/>} 
            />     
            <Route path={'/admin'} render={props => 
              this.state.user ? 
                <AdminRoutes user={this.state.user} setUser={this.setUser} {...props}/>
              : <Redirect to='/login' />
            } />
            <Route path={'/:userSlug'} component={TripListing}/>
          </Switch>  
      </Router>
    );
  }
}

export default App;