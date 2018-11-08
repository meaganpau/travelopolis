import React, { Component } from 'react';
import styled from 'react-emotion'
import { Link } from 'react-router-dom'
import DropdownMenu from './cms/DropdownMenu'
import { AppContext } from '../AppContext'

const HeaderContainer = styled('div')`
    display: flex;
    height: 85px;
    align-items: center;
    box-shadow: 0 0 10px 0 rgba(192, 192, 192, 0.5);
    width: 100%;
    justify-content: space-between;
    background: #fff;
`

const InnerContainer = styled('div')`
    display: flex;
    align-items: center;
    padding: 0 55px
`

const AppName = styled('span')`
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 1.3px;
    padding-left: 22px;
    padding-top: 8px;
    display: table-cell;
    vertical-align: middle;
`

const DropdownMenuTrigger = styled('div')`
    display: flex;
    margin-left: 30px;

    .user-icon {
        height: 50px;
    }

    img + img {
        margin-left: 15px;
        margin-top: 5px;
    }
`

const MyLink = ({...props}) => <Link {...props}>{props.children}</Link>;

const HeaderLink = styled(MyLink)`
    color: ${props => props.theme.color.font};
    text-decoration: none;
    display: table;
    position: relative;
`

const ExploreButton = styled(MyLink)`
    color: ${props => props.theme.color.font};
    border: 2px solid ${props => props.theme.color.main};
    text-decoration: none;
    padding: 5px 30px;
    border-radius: 8px;
    transition: 0.15s all ease;

    &:hover {
        border: 2px solid ${props => props.theme.color.accent1};
    }
`

const AdminButton = styled(MyLink)`
    color: ${props => props.theme.color.font};
    border: 2px solid ${props => props.theme.color.font};
    text-decoration: none;
    padding: 5px 30px;
    border-radius: 8px;
    margin-right: 50px;
    transition: 0.15s all ease;

    &:hover {
        border: 2px solid ${props => props.theme.color.font};
        background: ${props => props.theme.color.font};
        color: #fff;
    }
`

const LoginButton = styled(MyLink)`
    color: ${props => props.theme.color.font};
    border: 2px solid ${props => props.theme.color.main};
    text-decoration: none;
    padding: 5px 30px;
    border-radius: 8px;
    transition: 0.15s all ease;
    letter-spacing: 0.5px;

    &:hover {
        border: 2px solid ${props => props.theme.color.font};
    }
`

const RegisterButton = styled(MyLink)`
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
        background: ${props => props.theme.color.font};    
        border: 2px solid ${props => props.theme.color.font};
        color: #fff;
    }
`

const Divider = styled('span')`
    font-weight: 300;
    font-family: 'Helvetica Neue';
    margin: 0 20px;
    font-size: 20px;
    color: ${props => props.theme.color.inputBorder};
`

class Header extends Component {
    state = {
        dropdown: false
    }

    handleClick = e => {
        this.setState(prevState => ({
            dropdown: !prevState.dropdown
        }), () => document.body.addEventListener('click', this.handleDocumentClick))
    }
    
    handleDocumentClick = e => {
        this.setState({
            dropdown: false
        }, () => document.body.removeEventListener('click', this.handleDocumentClick))
    }

    render() {
        const { dropdown } = this.state;
        return (
            <HeaderContainer>
                <InnerContainer>
                    <HeaderLink to="/">
                        <img src="/images/header-logo.svg" alt="Logo" />
                        <AppName>Travelopolis</AppName>
                    </HeaderLink>
                </InnerContainer>
                <AppContext.Consumer>
                    { context => 
                        context.user && context.user.firstName ?
                            <React.Fragment>
                                <InnerContainer>
                                    <ExploreButton to="/explore">Explore</ExploreButton>
                                    <Divider>|</Divider>
                                    <AdminButton to="/admin">My Trips</AdminButton>
                                    <p>Hello, {context.user.firstName}!</p>
                                    <DropdownMenuTrigger onClick={this.handleClick}>
                                        <img src="/images/user.svg" alt="User icon" className="user-icon"/>
                                        <img src="/images/down-chevron.svg" alt="Down chevron"/>
                                    </DropdownMenuTrigger>
                                </InnerContainer>
                                <DropdownMenu logout={context.logout} show={dropdown}/>
                            </React.Fragment>
                        : 
                            <InnerContainer>
                                <RegisterButton to="/register">Register</RegisterButton>
                                <Divider>|</Divider>
                                <LoginButton to="/">Login</LoginButton>
                            </InnerContainer>
                    }
                </AppContext.Consumer>
            </HeaderContainer>
        )
    }
}

export default Header