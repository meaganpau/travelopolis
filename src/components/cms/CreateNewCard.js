import React from 'react';
import styled from 'react-emotion';

const Card = styled('div') `
    width: 303px;
    height: 347px;
    border-radius: 8px;
    text-align: center;
    display: block;
    border: solid 7px transparent;
    position: relative;
    border: solid 7px ${props => props.theme.color.font};

    &:hover {
        border: solid 7px ${props => props.theme.color.main};
    }

    h3 {
        color: ${props => props.theme.color.font};
        font-size: 300px;
        line-height: 1;
        margin-top: -45px;
        font-weight: 400;
        font-family: 'Helvetica Neue', sans-serif;
    }

    h4 {
        position: absolute;
        bottom: 15px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 20px;
        letter-spacing: 2px;
        color: ${props => props.theme.color.font};        
        text-transform: uppercase;
        width: 100%;
    }
`

const StyledCard = props => 
    <Card>
        <h3>{props.name}</h3>
        <h4>{props.subtext}</h4>
    </Card>

export default StyledCard;