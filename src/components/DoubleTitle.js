import React from 'react'
import styled from 'react-emotion'

const Header = styled('h1')`
    text-shadow: -3px 0 ${props => props.theme.color.main};
    font-size: 48px;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 2px;
    margin-bottom: 0;
    line-height: 1.2;
`

const DoubleTitle = ({ children }) => 
    <Header>
        { children }
    </Header>

export default DoubleTitle;