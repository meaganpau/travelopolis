import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import TinyMCE from '../../components/TinyMCE';
import { getToken } from '../../services/tokenServices'

class Journal extends Component {
  state = {
    journalID: '',
    user: false,
    status: 'Loading...',
    title: '',
    updatedJournal: false,
    slug: ''
  }

  componentDidMount() {
    const { match, user } = this.props;
    this.setState({ 
      journalID: match.params.journal, 
      user 
    }, () => {
      this.getJournalContent(this.state.journalID)
    })
  }

  getJournalContent = async journalID => {
    const token = getToken('userToken');
    if (token) {
      try {
        const res = await axios.get(`/api/journals/id/${journalID}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (res.data) {
          this.setState({ ...res.data });
        } else {
          this.setState({ status: 'No data found' });
        }
      }catch (e) {
        console.log(e);
        this.setState({ status: e });
      };
    }
  }

  handleEditorChange = content => {
    this.setState({ content });
  }
  
  handleFormSubmit = async e => {
    e.preventDefault();
    const { journalID, title, slug, content } = this.state;
    const token = getToken('userToken');
    if (token) {
      try {
        const res = await axios.post('/api/journals/id', {
            journalID,
            title,
            slug,
            content
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (res.data.errors || res.data.errmsg) {
          this.setState({ status: res.data.message });
        } else {
          this.setState({
            updatedJournal: res.data, 
            status: 'Journal updated!'
          })
        }
      } catch(e) {
        console.log(e);
      }
    }
  }

  handleChange = e => {
      const { name, value } = e.target;
      this.setState({ 
          [name]: value
      })
  }

  handleDelete = async e => {    
    e.preventDefault();
    const { journalID, title, trip } = this.state;
    if (window.confirm(`Are you sure you want to delete ${title}?`)) {
      const token = getToken('userToken');
      if (token) {
        try {
          const res = await axios.delete(`/api/journals/delete/${journalID}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          if (res.data.errors || res.data.errmsg) {
            this.setState({ status: res.data.message });
          } else {
            this.props.history.push({
              pathname: `/admin/trip/${trip._id}`,
              deleted: title
            })
          }
        } catch(e) {
          console.log(e);
        }
      }
    }  
  }

  render() {
    const { title, content, status, updatedJournal, slug, user, trip } = this.state;
    return (
      <div>
        {updatedJournal ? 
          <div>
            <p>{status}</p>
            <Link to={`/${user.slug}/${trip.slug}/${slug}`}>Preview {title}</Link>
          </div>
        : null}
        {title ? 
          <form onSubmit={this.handleFormSubmit}>
            <input onChange={this.handleChange} placeholder="Title" name="title" value={title}/>
            <input onChange={this.handleChange} placeholder="Slug" name="slug" value={slug}/>
            <TinyMCE value={content} onEditorChange={this.handleEditorChange} />
            <input type="submit" value="Save"/>
          </form>
        : `${status}`}
          <form onSubmit={this.handleDelete}>
            <input type="submit" value="Delete"/>
          </form>
      </div>
    )
  }
}

export default Journal;