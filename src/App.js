import React, { Component } from 'react';
import Trips from "./components/Trips";
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: ''
    };
  }

  showTrips = () => {
    axios.get('/api/trips').then(res => {
      if (res.data) {
        this.setState({ trips: res.data });
      }
    });
  };

  componentDidMount () {
    this.showTrips();
  }

  render() {
    return (
      <div>
        <Trips trips={this.state.trips} />
      </div>
    );
  }
}

export default App;