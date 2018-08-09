import React from 'react';
import styled from 'react-emotion';

const FooterContainer = styled('footer')`
    text-align: center;
    padding: 30px;
    font-size: 12px;
    font-family: 'Avenir Next','Helvetica Neue',sans-serif;
    color: #bbb;
`

const Footer = () =>
    <FooterContainer>
        © Travelopolis 2018
    </FooterContainer>

export default Footer;