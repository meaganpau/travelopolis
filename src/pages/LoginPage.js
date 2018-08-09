import React from 'react';
import styled from 'react-emotion';
import { Link, Redirect } from 'react-router-dom';
import { AppContext } from '../AppContext';
import FormPage from '../components/FormPage';
import LoginForm from '../components/LoginForm'; 
import Footer from '../components/Footer'; 

const LoginContainer = styled('div')`
    position: relative;

    footer {
        position: absolute;
        bottom: 0;
        right: 30%;
        transform: translateX(50%);
    }
`

const LoginPage = props =>
    <LoginContainer>
        <AppContext.Consumer>
            {context => {
                return(
                    context.user && context.isAuthenticated ? <Redirect to='/admin' />
                    : 
                    <FormPage
                    form={<LoginForm login={context.login}/>}
                    bottomContent={<Link to="/register" className="underline-link">Create account</Link>}
                    />
                )
            }}
        </AppContext.Consumer>
        <Footer />
    </LoginContainer>

export default LoginPage;