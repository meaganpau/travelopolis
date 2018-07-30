import React from 'react';
import styled from 'react-emotion';

const Container = styled('div')`
    margin: 12% auto 100px;
    position: relative;
    width: 600px;
    text-align: center;

    .underline-link {
        letter-spacing: 0.7px;
        display: inline-block;
        margin-top: 30px;
        color: ${props => props.theme.color.font};
        font-size: 16px;
        transition: 0.15s all ease;
        
        &:hover {
            color: ${props => props.theme.color.main};
        }
    }
`
    
const Form = styled('div')`
    border: solid 3.5px ${props => props.theme.color.font};
    padding: 50px;
    background: #fff;

    h1 {
        text-align: center;
        margin: 10px auto 0;
    }

    label {
        display: block;
        font-size: 18px;
        margin-left: 10px;
        margin-top: 20px;
        text-align: left;
    }

    input {
        display: block;
        width: 100%;
        padding: 10px 20px;
        border: solid 0.5px ${props => props.theme.color.inputBorder};
        border-radius: 3px;
        font-size: 18px;

        &.field-error {
            border: 2px solid ${props => props.theme.color.error};
        }
    }

    .error {
        color: ${props => props.theme.color.error};
    }

    .btn-main {
        padding: 10px 20px;
        border-radius: 3px;
        font-size: 18px;
        width: 50%;
        margin: 40px auto 0;
        background: ${props => props.theme.color.main};
        border: none;
        letter-spacing: 0.7px;
        transition: 0.15s all ease;
        color: ${props => props.theme.color.font};
        text-decoration: none;

        &:hover {
            cursor: pointer;
            background: ${props => props.theme.color.font};
            color: #fff;
        }
    }
`

const Logo = styled('div')`
    position: absolute;
    top: -70px;
    left: 50%;
    transform: translateX(-50%);
    background: ${props => props.theme.color.font};
    border-radius: 50%;
    height: 115px;
    width: 115px;

    img {
        height: 125px;
        position: relative;
        right: -25px;
        top: -30px;
    }
`

const FormContainer = props => 
    <Container>
        <Logo>
            <img src="../images/logo-boat.svg" alt="Logo"/>
        </Logo>
        <Form>
            {props.form}
        </Form>
        {props.bottomContent}
    </Container>

export default FormContainer;