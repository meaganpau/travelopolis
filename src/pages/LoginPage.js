import React from 'react';
import { Link } from 'react-router-dom';
import FormPage from '../components/FormPage';
import LoginForm from '../components/LoginForm';

const LoginPage = props =>
    <FormPage
        form={<LoginForm getCurrentUser={props.getCurrentUser}/>}
        bottomContent={<Link to="/register" className="underline-link">Create account</Link>}
    />

export default LoginPage;