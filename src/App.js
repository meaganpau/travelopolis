import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  async componentDidMount () {
    try {
      const response = await axios.get('/api');
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  render () {
    return (
      <div>Hello world!</div>
    )
  }
}

export default App;