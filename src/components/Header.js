import React, { Component } from 'react';
import styled from 'react-emotion'

const HeaderContainer = styled('div')`
    display: flex;
    height: 85px;
    align-items: center;
    box-shadow: 0 0 5px 0 rgba(192, 192, 192, 0.5);
    width: 100%;
    justify-content: space-between;
    background: #fff;
`

const InnerContainer = styled('div')`
    display: flex;
    align-items: center;
    padding: 0 30px
`

class Header extends Component {
    state = {
        location: '',
        user: ''
    }

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        const { user } = this.state;
        return (
            <HeaderContainer>
                <InnerContainer>
                    <img src="/images/header-logo.svg" />
                    <span>Travelopolis</span>
                </InnerContainer>
                { user ? 
                    <InnerContainer>
                        <p>Hello</p>
                    </InnerContainer>
                : null }
            </HeaderContainer>
        )
    }
}

export default Header