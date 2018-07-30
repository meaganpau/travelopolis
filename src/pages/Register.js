import React from 'react';
import { Link } from 'react-router-dom';
import FormPage from '../components/FormPage';
import RegistrationForm from '../components/RegistrationForm';

const Register = props =>
    <FormPage
        form={<RegistrationForm/>}    
        bottomContent={<Link to="/forgot-password" className="underline-link">Forgot password?</Link>}
    />

export default Register;
