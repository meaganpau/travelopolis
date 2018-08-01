import React from 'react';
import styled from 'react-emotion';

const Card = styled('div') `
    width: 303px;
    height: 347px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 0 24px 0 rgba(193, 193, 193, 0.5);
    text-align: center;
    display: block;
    border: solid 7px transparent;
    position: relative;
    padding: 30px;
    word-wrap: break-word;

    &:hover {
        border: solid 7px ${props => props.theme.color.font};
    }

    h3 {
        color: ${props => props.theme.color.font};
        font-size: 20px;
        letter-spacing: 2px;
        text-transform: uppercase;
        margin-top: 30%;
    }

    h4 {
        position: absolute;
        bottom: 15px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 14px;
        color: #9e9e9e;
        letter-spacing: 1px;
        font-weight: 500;
        width: 100%;
    }
`

const StyledCard = props => 
    <Card>
        <h3>{props.name}</h3>
        <h4>{props.subtext}</h4>
    </Card>

export default StyledCard;