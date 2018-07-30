import React from 'react';
import styled from 'react-emotion';
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
`

const MainContainer = styled('div')`
    display: flex;
`

const FormPage = props => 
    <MainContainer>
        <ImageBackground background="../images/giant-boat.svg">
            <Header>
                <h1>Travelopolis</h1>
                <h2>Keep a log of your travel memories</h2>
            </Header>
        </ImageBackground>
        <FormContainer
            form={props.form}
            bottomContent={props.bottomContent}
        />
    </MainContainer>

export default FormPage;