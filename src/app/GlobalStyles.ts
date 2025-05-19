import styled, { createGlobalStyle } from "styled-components";
export const Wrapper = styled.div`
  margin: 3% auto;
  max-width: 1200px; 
  padding: 0 15px; 
  box-sizing: border-box;

  @media (max-width: 1300px) {
    padding: 0 10px;
  }

  @media (max-width: 1200px) {
    padding: 0 7px;
  }

  @media (max-width: 1127px) {
    padding: 0 5px;
  }
`;
export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&display=swap');

  * {
    margin: 0;
    padding: 0;
    font-family: 'Comfortaa', sans-serif;
  }
`;
//©sapizi