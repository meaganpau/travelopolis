import React from "react"
import styled from "@emotion/styled"

const Breadcrumbs = styled("div")`
    padding: 30px 95px 0;
    margin-bottom: -20px;

    img {
        margin-right: 10px;
        transform: translateY(-3px);
    }

    a {
        text-decoration: none;
        color: ${(props) => props.theme.color.font};

        &:hover {
            span {
                border-bottom: 1px solid ${(props) => props.theme.color.font};
            }
        }
    }
`

const BreadcrumbContainer = ({ children }) => (
    <Breadcrumbs>{children}</Breadcrumbs>
)

export default BreadcrumbContainer
