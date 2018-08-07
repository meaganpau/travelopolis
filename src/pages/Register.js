import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import FormPage from '../components/FormPage';
import RegistrationForm from '../components/RegistrationForm';
import { AppContext } from '../AppContext'

const Register = () =>
    <AppContext.Consumer>
        { context => {
            return(
                context.user && context.isAuthenticated ? 
                <Redirect to="/admin" />
                :
                <FormPage
                    form={<RegistrationForm/>}    
                    bottomContent={<Link to="/forgot-password" className="underline-link">Forgot password?</Link>}
                />
            )
        }}
    </AppContext.Consumer>

export default Register;
