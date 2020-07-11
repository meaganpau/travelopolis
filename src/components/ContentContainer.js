import React from "react"
import styled from "@emotion/styled"

const MainContainer = styled("div")`
    padding: 30px 95px 100px;
`

const Container = ({ children }) => <MainContainer>{children}</MainContainer>

export default Container
