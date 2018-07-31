import React from 'react';
import styled from 'react-emotion';

const MainContainer = styled('div')`
    padding: 30px 95px;
`

const Container = props => (
    <MainContainer>
        {props.children}
    </MainContainer>
)

export default Container;
