import React from "react"
import styled from "@emotion/styled"

const MainContainer = styled("div")`
    padding: 30px 100px 100px;
    max-width: 1229px;
    margin: 0 auto;
`

const Container = ({ children }) => <MainContainer>{children}</MainContainer>

export default Container
