import React from 'react';
import styled from 'react-emotion';

const MainContainer = styled('div')`
    padding: 30px 100px;
    max-width: 1229px;
    margin: 0 auto;
`

const Container = props => (
    <MainContainer>
        {props.children}
    </MainContainer>
)

export default Container;
