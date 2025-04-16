import styled, { createGlobalStyle } from "styled-components";
export const Wrapper = styled.div`
    margin-left: 15%;
    margin-top: 3%;
    margin-right: 15%;
    @media(max-width: 1300px){
      margin-left: 10%;
    }
    @media(max-width: 1200px){
      margin-left: 7%;
    }
    @media(max-width: 1127px){
      margin-left: 5%;
    }

`
export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&display=swap');

  * {
    margin: 0;
    padding: 0;
    font-family: 'Comfortaa', sans-serif;
  }
`;