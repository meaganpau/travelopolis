import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getToken } from "../../services/tokenServices";

class Journals extends Component {
  state = {
    tripID: '',
    journals: [],
    status: '',
    name: '',
    slug: '',
    updated: false
  }

  componentDidMount() {
    const tripID = this.props.match.params.trip;
    this.setState({
      tripID
    }, () => {
      const { tripID } = this.state;
      this.getTripJournals(tripID)
      this.getTrip(tripID)
    })
  }

  getTrip = tripId => {
    const token = getToken('userToken');
    if (token) {
      axios.get(`/api/trips/id/${tripId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
      .then(res => {
        if (res.data) {
          const { name, slug } = res.data;
          this.setState({ name, slug });
        } else {
          this.setState({ status: 'Trip not found' });
        }
      })
      .catch(e => {
        console.log(e);
      })
    }
  }

  getTripJournals = tripId => {
    axios.get(`/api/journals/tripid/${tripId}`)
      .then(res => {
        if (res.data.length) {
          this.setState({ journals: res.data });
        } else {
          this.setState({ status: 'No journals found' });
        }
      })
      .catch (e => {
        console.log(e);
        this.setState({ status: e });
      });
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ 
        [name]: value
    })
  }
  
  handleFormSubmit = e => {
    e.preventDefault();
    const token = getToken('userToken');
    const { name, slug, tripID } = this.state;

    axios.post('/api/trips/id', {
        tripID,
        name,
        slug
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
        if (res.data.errors || res.data.errmsg) {
            this.setState({ status: res.data.message });
        } else {
            this.setState({
                updated: true,
                status: 'Trip updated!'
            })
        }
    })
    .catch(e => {
        console.log(e);
        this.setState({ status: 'Error updating trip.' });
    })
  }
  
  render() {
    const { journals, name, status, updated, slug } = this.state;
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <h3>Name</h3>
          <input onChange={this.handleChange} placeholder="Name" name="name" value={name}/>
          <h3>Slug</h3>
          <input onChange={this.handleChange} placeholder="Slug" name="slug" value={slug}/>
          <input type="submit" value="Update Trip"/>
        </form>
        {updated ? <p>{status}</p> : null}
        <Link to='/admin/add_journal'>Add Journal</Link>
        {journals ? 
          journals.map(journal => (
            <li key={journal._id}>
              <Link to={`/admin/journal/${journal._id}`}>{journal.title}</Link>
            </li>
          ))   
        : `${status}`}
      </div>
    )
  }
}

export default Journals;