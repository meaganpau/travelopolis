import React from 'react';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';
import FormContainer from './FormContainer'

const ImageBackground = styled('div')`
    background-image: url('${props => props.background}');
    background-size: cover;
    background-repeat: no-repeat;
    background-color: ${props => props.theme.color.main};
    color: #fff;
    min-height: 100vh;
    width: 40%;
`

const Header = styled('div')`
    padding-top: 40%;
    text-align: right;
    padding-right: 10%;
    
    h1 {
        font-size: 56px;
        font-weight: bold;
        margin: 0;
        text-transform: uppercase;
    }

    h2 {
        font-size: 24px;
        font-weight: 500;
        margin: 0;
    }

    a {
        color: #fff;
        border: 2px solid #fff;
        border-radius: 3px;
        padding: 10px 50px;
        text-decoration: none;
        margin: 20px 0;
        display: inline-block;
        letter-spacing: 0.7px;
        font-size: 18px;
        transition: 0.15s all ease;

        &:hover {
            background: #fff;
            color: ${props => props.theme.color.main}
        }
    }
`

const MainContainer = styled('div')`
    display: flex;
`

const FormPage = ({ form, bottomContent }) => 
    <MainContainer>
        <ImageBackground background="../images/giant-boat.svg">
            <Header>
                <h1>Travelopolis</h1>
                <h2>Keep a log of your travel memories</h2>
                <Link to="/explore">Explore</Link>
            </Header>
        </ImageBackground>
        <FormContainer
            form={form}
            bottomContent={bottomContent}
        />
    </MainContainer>

export default FormPage;