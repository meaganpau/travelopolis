import React, { Component } from "react";
import axios from 'axios';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';
import { AppContext } from '../../AppContext'
import { getToken } from '../../services/tokenServices'
import TinyMCE from '../../components/TinyMCE';
import DoubleTitle from '../../components/DoubleTitle';

const SaveButton = styled('input')`
  background: ${props => props.theme.color.main};
  font-size: 14px;
  letter-spacing: 1px;
  border-radius: 8px;
  padding: 8px;
  border: none;
  width: 180px;
`

const DeleteButton = styled('input')`
  font-size: 14px;
  letter-spacing: 1px;
  border-radius: 8px;
  padding: 8px;
  border: 2px solid ${props => props.theme.color.font};
  width: 180px;
`

class Journal extends Component {
  state = {
    journalID: '',
    status: 'Loading...',
    title: '',
    updatedJournal: false,
    slug: ''
  }

  componentDidMount() {
    const { match } = this.props;
    this.setState({ journalID: match.params.journal }, () => {
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
    const { title, content, status, updatedJournal, slug, trip } = this.state;
    return (
      <React.Fragment>
        <DoubleTitle>Update Journal</DoubleTitle>
        <AppContext.Consumer>
          { context => {
            return (
              updatedJournal ? 
                <div>
                  <p>{status}</p>
                  <Link to={`/${context.user.slug}/${trip.slug}/${slug}`}>Preview {title}</Link>
                </div>
              : null
            )}
          }
        </AppContext.Consumer>
        {title ? 
          <form onSubmit={this.handleFormSubmit}>
            <label htmlFor="title">Title</label>
            <input onChange={this.handleChange} name="title" id="title" value={title} maxLength="50" required />
            <label htmlFor="slug">Slug</label>
            <input onChange={this.handleChange} name="slug" id="slug" value={slug} maxLength="50" required />
            <SaveButton type="submit" value="Save"/>
            <TinyMCE value={content} onEditorChange={this.handleEditorChange} id="content"/>
          </form>
        : `${status}`}
          <form onSubmit={this.handleDelete}>
            <DeleteButton type="submit" value="Delete"/>
          </form>
      </React.Fragment>
    )
  }
}

export default Journal;