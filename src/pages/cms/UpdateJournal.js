import React, { Component } from "react";
import axios from 'axios';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';
import { AppContext } from '../../AppContext'
import { getToken } from '../../services/tokenServices'
import TinyMCE from '../../components/TinyMCE';
import DoubleTitle from '../../components/DoubleTitle';
import InnerContainer from '../../components/InnerContainer';
import SuccessContainer from '../../components/cms/SuccessContainer';
import BreadcrumbContainer from '../../components/cms/BreadcrumbContainer';

const SaveButton = styled('input')`
  background: ${props => props.theme.color.main};
  letter-spacing: 1px;
  border-radius: 8px;
  padding: 8px;
  border: none;
  width: 180px;
  border: 2px solid transparent;    
  transition: 0.15s all ease;
  margin-top: 20px;
  float: right;

  &:hover {
    background: ${props => props.theme.color.accent1};
    color: #fff;
  }
`

const DeleteButton = styled('input')`
  font-size: 14px;
  letter-spacing: 0.5px;
  border-radius: 8px;
  padding: 5px;
  border: 2px solid ${props => props.theme.color.font};
  width: 110px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  transition: 0.15s all ease;

  &:hover {
    background: ${props => props.theme.color.error};    
    border: 2px solid ${props => props.theme.color.error};
    color: #fff;
  }
`

const Form = styled('form')`
  margin-top: 20px;

  fieldset {
    padding: 0;
    border: none;
    width: 48%;

    input {
      width: 100%;
      padding: 10px 20px;
      border: solid 0.5px ${props => props.theme.color.inputBorder};
      border-radius: 3px;
      font-size: 18px;
    }
  }
`

const MetaContainer = styled('div')`
  display: flex;  
  justify-content: space-between;
  margin-bottom: 20px;
`

const TitleSection = styled('div')`
  position: relative;
`

class Journal extends Component {
  state = {
    journalID: '',
    status: 'Loading...',
    title: '',
    updatedJournal: false,
    slug: '', 
    trip: ''
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
            status: 'Journal updated! 🤗'
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
        <BreadcrumbContainer>
          {trip ? <Link to={`/admin/trip/${trip._id}`}><img src="../../images/left-chevron.svg" alt="Left"/> Back to {trip.name}</Link> : null}
        </BreadcrumbContainer>
        <InnerContainer>
          <TitleSection>
            <DoubleTitle>Update Journal</DoubleTitle>
            { title ? 
              <form onSubmit={this.handleDelete}>
                <DeleteButton type="submit" value="Delete"/>
              </form>
            : null }
          </TitleSection>
          <AppContext.Consumer>
            { context => {
              return (
                updatedJournal ? 
                  <SuccessContainer>
                    <p>{status} <Link to={`/${context.user.slug}/${trip.slug}/${slug}`}>View {title}</Link></p>
                  </SuccessContainer>
                : null
              )}
            }
          </AppContext.Consumer>
          {title ? 
            <React.Fragment>
              <Form onSubmit={this.handleFormSubmit}>
                <MetaContainer>
                  <fieldset>
                    <label htmlFor="title">Title</label>
                    <input onChange={this.handleChange} name="title" id="title" value={title} maxLength="50" required />
                  </fieldset>
                  <fieldset>
                    <label htmlFor="slug">Slug</label>
                    <input onChange={this.handleChange} name="slug" id="slug" value={slug} maxLength="50" required />
                  </fieldset>
                </MetaContainer>
                <TinyMCE value={content} onEditorChange={this.handleEditorChange} id="content"/>
                <SaveButton type="submit" value="Save"/>
              </Form>
            </React.Fragment>
          : `${status}`}
        </InnerContainer>
      </React.Fragment>
    )
  }
}

export default Journal;