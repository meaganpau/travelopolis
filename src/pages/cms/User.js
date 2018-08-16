import React, { Component } from 'react';
import axios from 'axios';
import styled from 'react-emotion';
import Footer from '../../components/Footer'
import ContentContainer from '../../components/ContentContainer';
import DoubleTitle from '../../components/DoubleTitle';

const Form = styled('form')`
    padding: 50px;
    
    label {
        display: inline-block;
        width: 25%;

        span {
            color: ${props => props.theme.color.error};
        }
    }
    
    input:not([type="submit"]) {
        display: inline-block;
        width: 75%;
        padding: 10px 20px;
        border: solid 0.5px ${props => props.theme.color.inputBorder};
        border-radius: 3px;
        font-size: 18px;
        margin: 10px 0;
    }
`

const InnerContainer = styled('article')`
    max-width: 1029px;
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
        error: ''
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
        const { email, firstName, lastName, slug, _id, old_password } = this.state;

        let password = this.state.password ? this.state.password : old_password;
        
        try {
            const res = await axios.post('/api/users/update', {
                _id,
                email,
                password,
                old_password,
                firstName,
                lastName,
                slug
            })
            this.setState({ 
                updatedUser: res.data, 
                status: 'Updated successfully!'
            });
        } catch (e) {
            console.log(e);
            this.setState({ 
                error: e.response.data.message
            }, () => console.log(e.response.data.message))
        }
    }

    render() {
        const { firstName, lastName, email, password, slug, old_password } = this.state;

        return(
            <React.Fragment>
                <ContentContainer>
                    <InnerContainer>
                        <DoubleTitle>My Account</DoubleTitle>
                        <p>Your old password is required to make any changes.</p>
                        <Form onSubmit={this.handleSubmit}>
                            <label htmlFor="firstName">First Name<span>*</span></label>
                            <input type="text" onChange={this.handleChange} name="firstName" id="firstName" maxLength="50" value={firstName} required />
                            <label htmlFor="lastName">Last Name<span>*</span></label>
                            <input type="text" onChange={this.handleChange} name="lastName" id="lastName" maxLength="50" value={lastName} required />
                            <label htmlFor="email">Email address<span>*</span></label>
                            <input type="email" onChange={this.handleChange} name="email" id="email" maxLength="50" value={email} required />
                            <label htmlFor="password">New Password</label>
                            <input type="password" onChange={this.handleChange} name="password" id="password" maxLength="50" value={password} />
                            <label htmlFor="old_password">Old Password<span>*</span></label>
                            <input type="password" onChange={this.handleChange} name="old_password" id="old_password" maxLength="50" value={old_password} required />
                            <label htmlFor="slug">Slug<span>*</span></label>
                            <input type="text" onChange={this.handleChange} name="slug" id="slug" maxLength="50" value={slug} required />
                            <input type="submit" value="Update" className="btn-main" />
                        </Form>
                    </InnerContainer>
                </ContentContainer>
                <Footer />
            </React.Fragment>
        )
    }
}

export default AccountPage;