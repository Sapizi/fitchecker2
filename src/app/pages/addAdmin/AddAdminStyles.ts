import styled from "styled-components";
export const Form = styled.form`
    width: 90%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 30px; 
    background-color: #f7f7f7;
    border-radius: 8px;
    border: 1px solid black;
    box-sizing: border-box;

    @media (max-width: 600px) {
        padding: 20px; 
        gap: 15px; 
    }
`