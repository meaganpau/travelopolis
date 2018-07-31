import React from 'react';
import styled from 'react-emotion';

const MainContainer = styled('div')`
    background: ${props => props.theme.color.background};
    min-height: 100vh;
`

const Container = props => (
    <MainContainer>
        {props.children}
    </MainContainer>
)

export default Container;
