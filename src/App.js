import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import { ThemeProvider } from 'emotion-theming'
import theme from './styles/theme'
import GlobalStyles from './styles/global'
import LoginPage from './pages/LoginPage';
import Explore from './pages/Explore';
import Register from './pages/Register';
import MainBackground from './components/MainBackground';
import TripListing from "./routes/TripListing";
import AdminRoutes from "./routes/AdminRoutes";
import { getToken, removeToken } from './services/tokenServices'

// eslint-disable-next-line
GlobalStyles; 

class App extends Component {
  state = {
    user: null,
    status: ''
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
        removeToken('userToken');
        const { status, data } = e.response;
        if (status !== 200) {
          this.setState({ status: data.err })
        }
      }
    }
  };

  render() {
    const { user, status } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <MainBackground>
          <Router>
              <Switch>
                <Route exact path="/" render={() => (
                  user ? 
                    <Redirect to={{pathname: '/admin', state: { user }}} />
                  : 
                    <LoginPage getCurrentUser={this.getCurrentUser} status={status}/>
                )}/>
                <Route exact path={'/explore'} render={() => <Explore user={user}/>} />      
                <Route exact path={'/register'} render={() => 
                  user ? <Redirect to={{pathname: '/admin', state: { user }}} />
                  : <Register/>} 
                />     
                <Route path={'/admin'} render={props => 
                  user ? 
                    <AdminRoutes user={user} setUser={this.setUser} {...props}/>
                  : <Redirect to='/' />
                } />
                <Route path={'/:userSlug'} component={TripListing}/>
              </Switch>  
          </Router>
        </MainBackground>
      </ThemeProvider>
    );
  }
}

export default App;