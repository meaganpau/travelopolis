import React, { Component } from 'react';
import styled from 'react-emotion'

const HeaderContainer = styled('div')`
    display: flex;
    height: 65px;
    align-items: center;
    box-shadow: 0 0 5px 0 rgba(192, 192, 192, 0.5);
    width: 100%;
`

class Header extends Component {
    state = {
        location: ''
    }

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        return (
            <HeaderContainer>
                Logo
            </HeaderContainer>
        )
    }
}

export default Header