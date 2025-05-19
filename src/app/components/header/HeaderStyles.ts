import styled from "styled-components";
export const HeaderContainer = styled.header`
    background-color: #E97C00;
    width: 100%;
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    

`
export const HeaderLogo = styled.h1`
    color: #fff;
    font-size: 64px;
    font-weight: 500;
    margin-left: 62px;
    @media (max-width: 768px) {
        font-size: 48px;
        margin-left: 24px;
    }
    @media (max-width: 375px) {
        font-size: 42px;
        margin-left: 24px;
    }
    @media (max-width: 320px) {
        font-size: 36px;
        margin-left: 24px;
    }
`
export const LogoutButton = styled.button`
    background-color: #e97c00;
    margin-right: 64px;
    height: 40px;
    width: 100px;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
    &:hover {
        background-color: #d16b00;
    }
    @media (max-width: 768px) {
        padding-right: 31px;
    }
    @media (max-width: 320px){
        padding-right: 0x;
    }
`;