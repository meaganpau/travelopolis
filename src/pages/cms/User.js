import React, { Component } from 'react';
import axios from 'axios';
import styled from 'react-emotion';
import Footer from '../../components/Footer'
import ContentContainer from '../../components/ContentContainer';
import DoubleTitle from '../../components/DoubleTitle';
import { CLIENT_RENEG_LIMIT } from 'tls';

const ErrorMessage = styled('span')`
    display: ${props => props.display};
    margin: 0 20px;
    font-size: 14px;

    img {
        height: 18px;
        transform: translateY(-15%);
        vertical-align: middle;
    }
`

const Form = styled('form')`
    padding: 50px;
    
    label {
        display: block;

        span {
            color: ${props => props.theme.color.error};
        }
    }
    
    input {
        &:not([type="submit"]) {
            width: 100%;
            padding: 10px 20px;
            border: solid 0.5px ${props => props.theme.color.inputBorder};
            border-radius: 3px;
            font-size: 18px;
            margin: 5px 0 20px;
        }
        
        &:disabled {
            background: #f0f0f0;
            color: #999;
        }

        &.field-error {
            border: 2px solid ${props => props.theme.color.error};
        }
    }

    fieldset {
        border: 0;
        padding: 0;
        margin-bottom: 10px;

        div {
            display: inline-block;
            width: calc(50% - 13px);

            &:first-of-type {
                margin-right: 26px;
            }
        }
    }
`

const InnerContainer = styled('article')`
    max-width: 800px;
    margin: 0 auto;
`

class AccountPage extends Component {
    state = {
        email: '',
        firstName: '',
        lastName: '',
        slug: '',
        _id: '', 
        password: '',
        old_password: '', 
        updatedUser: '',
        error: '',
        fieldError: ''
    }

    componentDidMount() {
        const { email, firstName, lastName, slug, _id } = this.props.user;
        this.setState({ email, firstName, lastName, slug, _id });
    }
    
    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ 
            [name]: value
        })
    }

    handleSubmit = async e => {
        e.preventDefault();
        const { firstName, lastName, slug, _id, old_password } = this.state;

        let password = this.state.password ? this.state.password : old_password;
        
        try {
            const res = await axios.post('/api/users/update', {
                _id,
                password,
                old_password,
                firstName,
                lastName,
                slug
            })
            this.setState({ 
                updatedUser: res.data, 
                fieldError: ''
            });
        } catch (e) {
            // Invalid password
            this.setState({ 
                error: e.response.data.message,
                fieldError: e.response.data.field
            })
        }
    }

    render() {
        const { firstName, lastName, email, password, slug, old_password, fieldError, updatedUser } = this.state;
        return(
            <React.Fragment>
                <ContentContainer>
                    <InnerContainer>
                        <DoubleTitle>My Account</DoubleTitle>
                        { updatedUser ? <p>Successfully updated user. 🙌</p> : 
                        <React.Fragment>
                            <p>Your old password is required to make any changes.</p>
                            <Form onSubmit={this.handleSubmit}>
                                <fieldset>
                                    <div>
                                        <label htmlFor="firstName">First Name<span>*</span></label>
                                        <input type="text" onChange={this.handleChange} name="firstName" id="firstName" maxLength="50" value={firstName} required />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName">Last Name<span>*</span></label>
                                        <input type="text" onChange={this.handleChange} name="lastName" id="lastName" maxLength="50" value={lastName} required />
                                    </div>
                                </fieldset>
                                <label htmlFor="email">Email address<span>*</span></label>
                                <input type="email" onChange={this.handleChange} name="email" id="email" maxLength="50" value={email} disabled />
                                <label htmlFor="password">New Password</label>
                                <input type="password" onChange={this.handleChange} name="password" id="password" maxLength="50" value={password} />
                                <label htmlFor="old_password">Old Password<span>*</span><ErrorMessage display={fieldError === 'old_password' ? 'inline' : 'none'}><img src="../../images/error.svg"/> Your old password is incorrect.</ErrorMessage></label>
                                <input type="password" onChange={this.handleChange} name="old_password" id="old_password" maxLength="50" value={old_password} required className={fieldError === 'old_password' ? 'field-error' : ''} />
                                <label htmlFor="slug">Slug<span>*</span><ErrorMessage display={fieldError === 'slug' ? 'inline' : 'none'}><img src="../../images/error.svg"/> This slug is already in use.</ErrorMessage></label>
                                <input type="text" onChange={this.handleChange} name="slug" id="slug" maxLength="50" value={slug} required className={fieldError === 'slug' ? 'field-error' : ''} />
                                <input type="submit" value="Update" className="btn-main" />
                            </Form>
                        </React.Fragment> }
                    </InnerContainer>
                </ContentContainer>
                <Footer />
            </React.Fragment>
        )
    }
}

export default AccountPage;