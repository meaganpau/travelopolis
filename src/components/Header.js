import React, { Component } from 'react';
import styled from 'react-emotion'
import { Link } from 'react-router-dom'
import DropdownMenu from './cms/DropdownMenu'

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

class Header extends Component {
    state = {
        user: '',
        dropdown: false
    }

    componentDidMount() {
        if (this.props.user) {
            const { user } = this.props;
            this.setState({
                user
            })
        }
    }

    handleClick = e => {
        e.preventDefault();
        this.setState(prevState => ({
            dropdown: !prevState.dropdown
        }))
    }

    render() {
        const { user, dropdown } = this.state;
        return (
            <HeaderContainer>
                <InnerContainer>
                    <HeaderLink to="/">
                        <img src="/images/header-logo.svg" alt="Logo" />
                        <AppName>Travelopolis</AppName>
                    </HeaderLink>
                </InnerContainer>
                { user ? 
                    <React.Fragment>
                        <InnerContainer>
                            <Link to="/explore">Explore</Link>
                            <p>Hello, {user.firstName}!</p>
                            <DropdownMenuTrigger onClick={this.handleClick}>
                                <img src="../images/user.svg" alt="User icon" className="user-icon"/>
                                <img src="../images/down-chevron.svg" alt="Down chevron"/>
                            </DropdownMenuTrigger>
                        </InnerContainer>
                        <DropdownMenu setUser={this.props.setUser} show={dropdown}/>
                    </React.Fragment>
                : 
                    <InnerContainer>
                        <Link to="/register">Register</Link>
                        |
                        <Link to="/">Login</Link>
                    </InnerContainer>
                }
            </HeaderContainer>
        )
    }
}

export default Header