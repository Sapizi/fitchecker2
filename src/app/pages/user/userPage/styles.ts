import Link from "next/link";
import styled from "styled-components";
export const UserText = styled.p`
    font-size: 24px;
`
export const UserLink = styled(Link)`
    font-size: 24px;
    color: black;
    transition: 0.3s;
    &:hover{
        color: #e97c00;
    }
`