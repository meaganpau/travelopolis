import React from 'react';
import styled from 'react-emotion';

const Container = styled('div')`
  background: white;
  padding: 0px 20px;
  margin: 20px auto;
  border-radius: 5px;
  border: 2px solid ${props => props.theme.color.accent1};

  a {
    color: ${props => props.theme.color.accent2};
  }
`

const SuccessContainer = ({ children }) => 
<Container>
    {children}
</Container>

export default SuccessContainer;