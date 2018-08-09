import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../../services/tokenServices'
import axios from 'axios';
import styled from 'react-emotion';
import DoubleTitle from '../../components/DoubleTitle'
import InnerContainer from '../../components/InnerContainer'
import BreadcrumbContainer from '../../components/cms/BreadcrumbContainer'

const MyLink = ({...props}) => <Link {...props}>{props.children}</Link>;

const YellowButton = styled('input')`
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
    margin-left: 12px;
    margin-bottom: 16px;
    align-self: flex-end;
    height: min-content;

    &:hover {
        background: transparent;    
        border: 2px solid ${props => props.theme.color.main};
    }
`

const YellowLink = YellowButton.withComponent(MyLink);

const Form = styled('form')`
    margin: 20px auto;
    display: flex;
`

const Input = styled('input')`
    display: block;
    width: 50%;
    min-width: 250px;
    padding: 10px 20px;
    border: solid 0.5px ${props => props.theme.color.inputBorder};
    border-radius: 3px;
    font-size: 18px;
    width: 100%;
`

const Label = styled('label')`
    display: inline-block;
    margin-bottom: 5px;
    font-size: 18px;

    span {
        color: ${props => props.theme.color.error}
    }
`

const Fieldset = styled('fieldset')`
    border: 0;
    width: 35%;
`

const GreyButton = styled(MyLink)`
    border: 2px solid ${props => props.theme.color.font};
    background: ${props => props.theme.color.font};
    color: #fff;
    text-decoration: none;
    padding: 5px 30px;
    border-radius: 8px;
    margin-left: 20px;
    transition: 0.15s all ease;
    
    &:hover {
        color: ${props => props.theme.color.font};
        background: transparent;
    }
`

const Status = styled('p')`
    margin-left: 12px;
    margin-bottom: 30px;
`

class AddTrip extends Component {
    state = {
        user: {},
        name: '',
        slug: '',
        status: '',
        newTrip: {},
        newTripURL: ''
    }

    handleSubmit = async e => {
        e.preventDefault();
        const token = getToken('userToken');
        const { user, name, slug } = this.state;
        try { 
            const res = await axios.post('/api/trips', {
                user,
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
                    newTrip: res.data, 
                    status: 'New Trip created!',
                    newTripURL: `/${user.slug}/${res.data.slug}`
                })
            }
        } catch(e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.setState({ user: this.props.user })
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ 
            [name]: value
        })
    }

    render() {
        const { name, status, newTripURL, newTrip } = this.state;

        return(
            <React.Fragment>
                <BreadcrumbContainer>
                    <Link to={`/admin`}><img src="../../images/left-chevron.svg" alt="Left"/> Back to Trips</Link>
                </BreadcrumbContainer>
                <InnerContainer>
                    <DoubleTitle>Create A Trip</DoubleTitle>
                    {status ? 
                        <React.Fragment>
                            <Status>{status}</Status>                 
                            { newTripURL ? <YellowLink to={`${newTripURL}`}>View {name}</YellowLink>: null }
                            <GreyButton to={{ pathname: '/admin/add_journal', state: newTrip._id }}>Add Journal</GreyButton>
                        </React.Fragment>
                        :
                        <Form onSubmit={this.handleSubmit}>
                            <Fieldset>
                                <Label htmlFor="name">Trip name<span>*</span></Label>
                                <Input type="text" onChange={this.handleChange} name="name" id="name" maxLength="50" required />
                            </Fieldset>
                            <Fieldset>
                                <Label htmlFor="slug">Trip slug<span>*</span></Label>
                                <Input type="text" onChange={this.handleChange} name="slug" id="slug" maxLength="50" required />
                            </Fieldset>
                            <YellowButton type="submit" value="Create Trip"/>                        
                        </Form>
                    }
                </InnerContainer>
            </React.Fragment>            
        )
    }
}

export default AddTrip