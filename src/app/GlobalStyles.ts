import styled, { createGlobalStyle } from "styled-components";
export const Wrapper = styled.div`
  margin: 3% auto; /* Центрируем по горизонтали с верхним отступом */
  max-width: 1200px; /* Ограничиваем максимальную ширину для больших экранов */
  padding: 0 15px; /* Симметричные внутренние отступы */
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