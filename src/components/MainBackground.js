import React from 'react';
import styled from 'react-emotion'

const Container = styled ('div')`
  background: ${props => props.theme.color.background};
  min-height: 100vh;
`

const MainBackground = props =>
    <Container>
        { props.children }
    </Container>

export default MainBackground;