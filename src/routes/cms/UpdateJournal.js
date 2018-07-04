import React, { Component } from "react";
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';

class Journal extends Component {
  state = {
    journalID: null,
    user: null,
    status: 'Loading...',
    title: '',
    newJournal: null
  }

  componentDidMount() {
    const journalID = this.props.match.params.journal;
    this.setState({ journalID }, () => {
      this.getJournalContent(this.state.journalID)
    })
  }

  getJournalContent = journalID => {
    axios.get(`/api/journals/id/${journalID}`)
      .then(res => {
        if (res.data) {
          this.setState({ ...res.data });
        } else {
          this.setState({ status: 'No data found' });
        }
      })
      .catch (e => {
        console.log(e);
        this.setState({ status: e });
    });
  }

  handleEditorChange = content => {
    this.setState({ content });
  }
  
  handleFormSubmit = () => {
    const { journalID, title, slug, content } = this.state;

    axios.post('/api/journals/id', {
        journalID,
        title,
        slug,
        content
    })
    .then(res => {
        if (res.data.errors || res.data.errmsg) {
            this.setState({ status: res.data.message });
        } else {
            this.setState({
                newJournal: res.data, 
                status: 'Journal updated!'
            })
        }
    })
    .catch(e => {
        console.log(e);
        this.setState({ status: 'Error updating journal.' });
    })
  }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ 
            [name]: value
        })
    }

  render() {
    const { title, content, status, newJournal } = this.state;
    return (
      <div>
        {newJournal ? 
            <p>{status}</p>    
        : null}
        {title ? 
          <div>
            <input onChange={this.handleChange} placeholder="Title" name="title" value={title}/>
            <Editor value={content} onEditorChange={this.handleEditorChange} id="journal-content"/>
            <button onClick={this.handleFormSubmit}>Update Journal</button>
          </div>
        : `${status}`}
      </div>
    )
  }
}

export default Journal;