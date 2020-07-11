import React from "react"
import { Link } from "react-router-dom"
import styled from "@emotion/styled"
import Header from "../components/Header"
import InnerContainer from "../components/InnerContainer"
import DoubleTitle from "../components/DoubleTitle"

const MyLink = ({ ...props }) => <Link {...props}>{props.children}</Link>

const JournalLink = styled(MyLink)`
    text-decoration: none;
    margin-top: 20px;
    display: inline-block;
    background: ${(props) => props.theme.color.main};
    padding: 5px 30px;
    border-radius: 8px;
    color: ${(props) => props.theme.color.font};
    transition: 0.15s all ease;

    &:hover {
        background: ${(props) => props.theme.color.accent1};
        color: #fff;
    }
`

const Paragraph = styled("p")`
    margin: 10px 0;
`

const NotFound = () => (
    <React.Fragment>
        <Header />
        <InnerContainer>
            <DoubleTitle>404 - Page Not Found</DoubleTitle>
            <Paragraph>Sorry, looks like you were led astray.</Paragraph>
            <Paragraph>
                Are you lost? Find yourself in one of these journals:{" "}
            </Paragraph>
            <JournalLink to="/explore">Explore Journals</JournalLink>
        </InnerContainer>
    </React.Fragment>
)

export default NotFound
