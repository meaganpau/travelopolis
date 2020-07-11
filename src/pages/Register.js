import React from "react"
import styled from "@emotion/styled"
import { Link, Redirect } from "react-router-dom"
import { AppContext } from "../AppContext"
import FormPage from "../components/FormPage"
import RegistrationForm from "../components/RegistrationForm"
import Footer from "../components/Footer"

const Registration = styled("div")`
    position: relative;

    footer {
        position: absolute;
        bottom: 0;
        right: 30%;
        transform: translateX(50%);
    }
`

const Register = () => (
    <Registration>
        <AppContext.Consumer>
            {(context) => {
                return context.user && context.isAuthenticated ? (
                    <Redirect to="/admin" />
                ) : (
                    <FormPage
                        form={<RegistrationForm />}
                        bottomContent={
                            <Link
                                to="/forgot-password"
                                className="underline-link"
                            >
                                Forgot password?
                            </Link>
                        }
                    />
                )
            }}
        </AppContext.Consumer>
        <Footer />
    </Registration>
)

export default Register
