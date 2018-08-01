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
    deleted: ''
  }

  componentDidMount() {
    if (this.props.location.hasOwnProperty('deleted')) {
      const { deleted } = this.props.location;
      this.setState({
        deleted: `"${deleted}" deleted`
      })
    }
    const tripID = this.props.match.params.trip;
    this.setState({
      tripID
    }, () => {
      const { tripID } = this.state;
      this.getTripJournals(tripID)
      this.getTrip(tripID)
    })
  }

  getTrip = async tripId => {
    const token = getToken('userToken');
    if (token) {
      try {
        const res = await axios.get(`/api/trips/id/${tripId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (res.data) {
          const { name, slug } = res.data;
          this.setState({ name, slug });
        } else {
          this.setState({ status: 'Trip not found' });
        }
      } catch(e) {
        console.log(e);
      }
    }
  }

  getTripJournals = async tripId => {
    try {
      const res = await axios.get(`/api/journals/tripid/${tripId}`)
      if (res.data.length) {
        this.setState({ journals: res.data });
      } else {
        this.setState({ status: 'No journals found' });
      }
    } catch (e) {
      console.log(e);
      this.setState({ status: e });
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ 
        [name]: value
    })
  }
  
  handleFormSubmit = async e => {
    e.preventDefault();
    const token = getToken('userToken');
    const { name, slug, tripID } = this.state;

    try {
      const res = await axios.post('/api/trips/id', {
        tripID,
        name,
        slug
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (res.data.errors || res.data.errmsg) {
        this.setState({ status: res.data.message });
      } else {
        this.setState({
          status: 'Trip updated!'
        })
      }
    } catch(e) {
      console.log(e);
      this.setState({ status: 'Error updating trip.' });
    }
  }
  
  handleDelete = async e => {    
    e.preventDefault();
    const { tripID } = this.state;
    if (window.confirm(`Are you sure you want to delete this trip? This will also delete all linked journals.`)) {
      const token = getToken('userToken');
      if (token) {
        try {
          const res = await axios.delete(`/api/trips/delete/${tripID}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          if (res.data.errors || res.data.errmsg) {
            this.setState({ status: res.data.message });
          } else {
            this.props.history.push(`/admin`);
          }
        } catch(e) {
          console.log(e);
        }
      }
    }  
  }

  render() {
    const { journals, name, status, slug, deleted, tripID } = this.state;
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <h3>Name</h3>
          <input onChange={this.handleChange} placeholder="Name" name="name" value={name}/>
          <h3>Slug</h3>
          <input onChange={this.handleChange} placeholder="Slug" name="slug" value={slug}/>
          <input type="submit" value="Update Trip"/>
        </form>
        <form onSubmit={this.handleDelete}>
            <input type="submit" value="Delete"/>
          </form>
        {deleted ? <p>{deleted}</p> : null}
        {status ? <p>{status}</p> : null}
      <Link to={{ pathname: '/admin/add_journal', state: tripID }}>Add Journal</Link>
        {journals ? 
          journals.map(journal => (
            <li key={journal._id}>
              <Link to={`/admin/journal/${journal._id}`}>{journal.title}</Link>
            </li>
          ))   
        : null}
      </div>
    )
  }
}

export default Journals;