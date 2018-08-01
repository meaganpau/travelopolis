import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import FormPage from '../components/FormPage';
import LoginForm from '../components/LoginForm'; 
import { AppContext } from '../AppContext';

const LoginPage = props =>
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

export default LoginPage;