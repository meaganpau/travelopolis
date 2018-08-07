import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import axios from 'axios';
import styled from 'react-emotion';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import { getToken } from "../../services/tokenServices";
import DoubleTitle from '../../components/DoubleTitle';

const MyLink = ({...props}) => <Link {...props}>{props.children}</Link>;

const Container = styled('div')`
  margin-left: 12px;
  
  .ReactTable {
    margin-top: 30px;
    text-align: center;

    .title {
      text-align: left;
    }

    .rt-tr {
      align-items: center;
    }

    .rt-td {
      padding: 15px 20px;
    }

    .rt-th:focus {
      outline: none;
    }

    .rt-thead .rt-th, 
    .rt-thead .rt-td {
      padding: 8px 5px;
    }

    .rt-thead .rt-th.-sort-desc,
    .rt-thead .rt-td.-sort-desc {
      box-shadow: none;
      &::after {
        content: '';
        position: absolute;
        top: 17px;
        right: 30px;
        width: 0; 
        height: 0; 
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid ${props => props.theme.color.font};
      }
    }

    .rt-thead .rt-th.-sort-asc,
    .rt-thead .rt-td.-sort-asc {
      box-shadow: none;
      &::after {
        content: '';
        position: absolute;
        top: 17px;
        right: 30px;
        width: 0; 
        height: 0; 
        border-left: 5px solid transparent;
        border-right: 5px solid transparent; 
        border-bottom: 5px solid ${props => props.theme.color.font};
      }
    }
  }
`

const UpdateTrip = styled('input')`
    color: #fff;
    background: ${props => props.theme.color.accent1};
    text-decoration: none;
    padding: 5px 30px;
    border-radius: 8px;
    transition: 0.15s all ease;
    border: 2px solid ${props => props.theme.color.accent1};
    width: 150px;
    text-align: center;
    letter-spacing: 0.5px;
    margin-left: 12px;
    margin-top: 26px;
    height: min-content;
    align-self: center;

    &:hover {
        background: transparent;    
        border: 2px solid ${props => props.theme.color.main};
        color: ${props => props.theme.color.font};
    }
`

const CreateJournal = styled(MyLink)`
    color: ${props => props.theme.color.font};
    background: ${props => props.theme.color.main};
    text-decoration: none;
    padding: 5px 30px;
    border-radius: 8px;
    transition: 0.15s all ease;
    border: 2px solid ${props => props.theme.color.main};
    width: 150px;
    text-align: center;
    letter-spacing: 0.5px;

    &:hover {
        background: transparent;    
        border: 2px solid ${props => props.theme.color.main};
    }
`

const Input = styled('input')`
    display: block;
    width: 100%;
    min-width: 250px;
    padding: 15px 20px;
    border: solid 0.5px ${props => props.theme.color.inputBorder};
    border-radius: 3px;
    font-size: 18px;
`

const Label = styled('label')`
    display: inline-block;
    margin-bottom: 5px;
    font-size: 18px;

    span {
        color: ${props => props.theme.color.error}
    }
`

const Form = styled('form')`
    margin: 20px auto;
    margin-bottom: 35px;
`

const Fieldset = styled('fieldset')`
    border: 0;
    width: 100%;
`

const DeleteButton = styled('form')`
    margin-top: 36px;
    
    input {
      padding: 5px 30px;
      border-radius: 8px;
      color: ${props => props.theme.color.error};
      border: none;
      background: transparent;
      transition: 0.15s all ease;

      &:hover {
          background: ${props => props.theme.color.error};
          color: #fff;
      }
    }
`

const FormFlex = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Status = styled('p')`
    margin-left: 12px;
    color: ${props => props.theme.color.accent1};
`

const DeleteJournal = styled('button')`
    border: 2px solid ${props => props.theme.color.font};
    border-radius: 8px;
    padding: 5px 30px;
    background: transparent;
    transition: 0.15s all ease;
    line-height: 1.35;

    &: hover {
      background: ${props => props.theme.color.error};
      border: 2px solid ${props => props.theme.color.error};
      color: #fff;
    }
`

const EditButton = styled(MyLink)`
    background: ${props => props.theme.color.accent2};
    color: #fff;
    border-radius: 8px;
    padding: 5px 30px;
    transition: 0.15s all ease;
    text-decoration: none;
    border: 2px solid ${props => props.theme.color.accent2};

    &:hover {
      background: transparent;
      color: ${props => props.theme.color.accent2};
    }
`

const ViewButton = styled(MyLink)`
    background: ${props => props.theme.color.accent1};
    color: #fff;
    border-radius: 8px;
    padding: 5px 30px;
    transition: 0.15s all ease;
    text-decoration: none;
    border: 2px solid ${props => props.theme.color.accent1};

    &:hover {
      background: transparent;
      color: ${props => props.theme.color.accent1};
    }
`

class Journals extends Component {
  state = {
    tripID: '',
    journals: [],
    status: '',
    name: '',
    slug: '',
    deleted: '',
    user: {}, 
    journalStatus: 'Loading...'
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
          const { name, slug, user } = res.data;
          this.setState({ name, slug, user });
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
        this.setState({ journalStatus: 'No journals found' });
      }
    } catch (e) {
      console.log(e);
      this.setState({ journalStatus: e });
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

  handleJournalDelete = async e => {    
    e.preventDefault();
    const { title, id } = e.target;
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      const token = getToken('userToken');
      if (token) {
        try {
          const res = await axios.delete(`/api/journals/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          if (res.data.errors || res.data.errmsg) {
            this.setState({ status: res.data.message });
          } else {
            this.setState({ deleted: title });
          }
        } catch(e) {
          console.log(e);
        }
      }
    }  
  }

  render() {
    const { journals, name, status, slug, deleted, tripID, user, journalStatus } = this.state;
    const columns = [{
        Header: 'Title',
        accessor: 'title',
        className: 'title',
        width: 400
      }, {
        Header: 'Date',
        accessor: 'date',
        Cell: props => <span className='number'>{format(props.value, 'MM/DD/YYYY')}</span>,
        width: 180
      }, {
        Header: '',
        accessor: 'slug',
        Cell: props => <ViewButton to={`/${user.slug}/${slug}/${props.value}`}>View</ViewButton>
      }, {
        Header: '',
        accessor: '_id',
        Cell: props => <EditButton to={`/admin/journal/${props.value}`}>Edit</EditButton>
      }, {
        Header: '',
        id: 'delete',
        accessor: d => d,
        Cell: props => <DeleteJournal onClick={this.handleJournalDelete} title={props.value.title} id={props.value._id}>Delete</DeleteJournal>
      }
    ]
    
    return (
      <React.Fragment>
        <FormFlex>
          <DoubleTitle>Journals: {name}</DoubleTitle>
          <DeleteButton onSubmit={this.handleDelete}>
              <input type="submit" value="Delete Trip"/>
          </DeleteButton>
        </FormFlex>
        {deleted ? <Status>{deleted}</Status> : null}
        {status ? <Status>{status}</Status> : null}
        <Form onSubmit={this.handleFormSubmit}>
          <FormFlex>
            <Fieldset>
              <Label htmlFor="name">Trip Name<span>*</span></Label>
              <Input onChange={this.handleChange} name="name" value={name} id="name" maxLength="50" required />
            </Fieldset>
            <Fieldset>
              <Label htmlFor="slug">Trip Slug<span>*</span></Label>
              <Input onChange={this.handleChange} name="slug" value={slug} id="slug" maxLength="50" required />
            </Fieldset>
            <UpdateTrip type="submit" value="Update Trip"/>
          </FormFlex>
        </Form>
        <Container>
          <CreateJournal to={{ pathname: '/admin/add_journal', state: tripID }}>Create Journal</CreateJournal>
          {journals.length ? 
            <ReactTable
              data={journals}
              columns={columns}
              defaultPageSize={10}
              className="-striped -highlight"
            />
          : <Status>{journalStatus}</Status>}
        </Container>
      </React.Fragment>
    )
  }
}

export default Journals;