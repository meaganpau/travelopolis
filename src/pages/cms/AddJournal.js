import React, { Component } from 'react';
import axios from 'axios';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';
import { getToken } from '../../services/tokenServices'
import TinyMCE from '../../components/TinyMCE';
import DoubleTitle from '../../components/DoubleTitle';
import InnerContainer from '../../components/InnerContainer';
import SuccessContainer from '../../components/cms/SuccessContainer';
import BreadcrumbContainer from '../../components/cms/BreadcrumbContainer';

const MyLink = ({...props}) => <Link {...props}>{props.children}</Link>;

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

const GreenButton = styled('button')`
    background: ${props => props.theme.color.accent2};
    letter-spacing: 0.5px;
    border-radius: 8px;
    padding: 8px 30px;
    border: none;
    border: 2px solid transparent;    
    transition: 0.15s all ease;
    margin-top: 10px;
    color: #fff;
    text-decoration: none;
    margin-left: 20px;
    display: inline-block;

    &:hover {
        background: transparent;
        border: 2px solid ${props => props.theme.color.accent2};
        color: ${props => props.theme.color.font};    
    }
`

const YellowButton = styled(MyLink)`
    background: ${props => props.theme.color.main};
    letter-spacing: 0.5px;
    border-radius: 8px;
    padding: 8px 30px;
    border: none;
    border: 2px solid transparent;    
    transition: 0.15s all ease;
    margin-top: 10px;
    color: ${props => props.theme.color.font};
    text-decoration: none;
    display: inline-block;

    &:hover {
        background: transparent;
        border: 2px solid ${props => props.theme.color.main};            
    }
`

const Form = styled('form')`
  margin-top: 20px;

  fieldset {
    padding: 0;
    border: none;
    width: 31%;

    input {
      width: 100%;
      padding: 10px 20px;
      border: solid 0.5px ${props => props.theme.color.inputBorder};
      border-radius: 3px;
      font-size: 18px;
    }

    select {
        display: block;
        width: 100%;
        height: 48px;
        border: solid 0.5px ${props => props.theme.color.inputBorder};
        border-radius: 3px;
        font-size: 18px;
        background: white;
    }
  }
`

const MetaContainer = styled('div')`
  display: flex;  
  justify-content: space-between;
  margin-bottom: 20px;
`

class AddJournal extends Component {
    state = {
        user: {},
        title: '',
        slug: '',
        content: '',
        trip: '',
        trips: [],
        status: '', 
        newJournal: {},
        newJournalURL: '',
        currentTrip: ''
    }

    handleFormSubmit = e => {
        e.preventDefault();
        const { trip } = this.state;
        if (!trip) {
            this.setState({trip: document.getElementById('select-trip').value }, () => {
                this.addJournal();
            })
        } else {
            this.addJournal();
        }
    }
    
    async addJournal() {
        const { user, title, slug, content, trip } = this.state;
        const token = getToken('userToken');
        if (token) {
            try { 
                const res = await axios.post('/api/journals', {
                    user,
                    title,
                    slug,
                    content,
                    trip
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (res.data.errors || res.data.errmsg) {
                    this.setState({ status: res.data.message });
                } else {
                    this.setState({
                        newJournal: res.data, 
                        status: 'New journal created! 🙌'
                    })
                    this.getJournalURL();
                }
            
            } catch (e) {
                console.log(e);
                this.setState({ status: 'Error creating journal.' });
            }
        }
    }
    
    async getJournalURL() {
        const { newJournal, user, trip } = this.state;
        const token = getToken('userToken');
        if (token) {
            try {
                const res = await axios.get(`/api/trips/id/${trip}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                this.setState({
                    newJournalURL: `/${user.slug}/${res.data.slug}/${newJournal.slug}`
                });
            } catch (e) {
                console.log(e);
                this.setState({ status: 'An error occurred.' });
            }
        }
    }

    componentDidMount() {
        const { user, location } = this.props;
        this.setState({ user: user, trip: location.state }, async () => {
            await this.getTrips(this.state.user._id);
            this.getCurrentTrip();
        })
    }

    getTrips = async userID => {
        try {
            const res = await axios.get(`/api/trips/user/${userID}`)
            if (res.data.length) {
              this.setState({ trips: res.data });
            } else {
              this.setState({ status: 'No trips found.' });
            }
        } catch (e) {
            console.log(e);
            this.setState({ status: 'Error loading trips.' });
        }
    }

    getCurrentTrip = () => {
        const { trip, trips } = this.state;
        const currentTrip = trips.filter(obj => obj._id === trip)
        this.setState({ currentTrip: currentTrip[0] })
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ 
            [name]: value
        })
    }

    handleEditorChange = content => {
        this.setState({ content });
    }

    createSelectItems = trips =>
        trips.map(trip => 
            <option key={trip._id} value={trip._id}>
                {trip.name}
            </option>
        )
   
    onDropdownSelected = e => {
        this.setState({ trip: e.target.value })
    }

    handleButtonClick = e => {
        e.preventDefault();
        window.location.reload();
    }

    render() {
        const { trips, status, newJournalURL, title, content, trip, currentTrip } = this.state;
        return(
            <React.Fragment>
                <BreadcrumbContainer>
                    {currentTrip ? <Link to={`/admin/trip/${currentTrip._id}`}><img src="../../images/left-chevron.svg" alt="Left"/> <span>Back to {currentTrip.name}</span></Link> : null}
                </BreadcrumbContainer>
                <InnerContainer>
                    <DoubleTitle>Create Journal</DoubleTitle>
                    {status ? 
                        <React.Fragment>
                            <SuccessContainer>
                                <p>{status}</p>
                            </SuccessContainer>
                            <YellowButton to={`${newJournalURL}`}>View {title}</YellowButton>
                            <GreenButton onClick={this.handleButtonClick}>Create another</GreenButton>
                        </React.Fragment>
                        :
                        <Form onSubmit={this.handleFormSubmit}>
                            <MetaContainer>
                                { trips ?
                                    <fieldset>
                                        <label htmlFor="select-trip">Trip</label>
                                        <select id="select-trip" onChange={this.onDropdownSelected} label="Select Trip" value={trip ? trip : trips[0]}>
                                            {this.createSelectItems(trips)}
                                        </select>
                                    </fieldset>
                                : null }
                                <fieldset>
                                    <label htmlFor="title">Title</label>
                                    <input type="text" onChange={this.handleChange} name="title" id="title" maxLength="50" required />
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="slug">Slug</label>
                                    <input type="text" onChange={this.handleChange} name="slug" id="slug" maxLength="50" required />
                                </fieldset>
                            </MetaContainer>
                            <TinyMCE value={content} onEditorChange={this.handleEditorChange}/>
                            <SaveButton type="submit" value="Save"/>                        
                        </Form>
                    }
                </InnerContainer>
            </React.Fragment>
        )
    }
}

export default AddJournal