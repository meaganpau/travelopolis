import React from "react"
import styled from "@emotion/styled"

const Container = styled("div")`
    background: ${(props) => props.theme.color.background};
    min-height: 100vh;
    position: relative;
`

const MainBackground = ({ children }) => <Container>{children}</Container>

export default MainBackground
