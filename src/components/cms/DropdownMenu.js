import React from 'react';
import styled from 'react-emotion';
import { removeToken } from "../../services/tokenServices";

const DropdownContainer = styled('ul')`
    display: ${props => props.show ? 'block' : 'none'};
    position: absolute;
    top: 100px;
    right: 50px;
    width: 279px;
    background-color: #ffffff;
    box-shadow: 0 0 11px 0 rgba(193, 193, 193, 0.5);
    margin: 0;
    padding: 0;
    list-style: none;
    z-index: 10;

    li {
        padding: 20px 30px;
        display: flex;
        align-items: center;

        &:hover {
            background: rgba(193, 193, 193, 0.5);
            cursor: pointer;
        }

        img {
            width: 35px;
            margin-right: 15px;
        }
    }
`

const DropdownMenu = props => {
    const logout = () => {
        removeToken('userToken');
        props.logout();
    };

    return (
        <DropdownContainer show={props.show}>
            <li>
                <img src="/images/settings.svg" alt="Settings icon"/>
                My Account
            </li>
            <li onClick={logout}>
                <img src="/images/logout.svg" alt="Log out icon"/>
                Log out
            </li>
        </DropdownContainer>
    )
}

export default DropdownMenu