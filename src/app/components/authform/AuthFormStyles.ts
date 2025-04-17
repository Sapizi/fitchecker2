import styled from "styled-components";

export const AllMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Используем min-height вместо height для учета Header */
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 10px; /* Уменьшаем padding на малых экранах */
  }
`;
export const Forma = styled.form`
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
    margin-top: 0; /* Убираем margin-top на малых экранах */
  }
`;

export const Title = styled.h2`
  font-size: 24px;
  text-align: center;
  color: #333;
  margin-bottom: 10px;
  @media (max-width: 600px) {
    font-size: 20px;
  }
`;
export const MainInput = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  width: 100%; 
  box-sizing: border-box;
  &:focus {
    outline: 2px solid #e97c00;
    outline-offset: 2px;
  }
  @media (max-width: 600px) {
    padding: 10px; 
    font-size: 14px; 
  }
`;
export const MainButton = styled.button`
  padding: 12px;
  font-size: 16px;
  background-color: #e97c00;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%; 
  box-sizing: border-box;
  &:hover {
    background-color: #ca6c00;
  }
  @media (max-width: 600px) {
    padding: 10px;
    font-size: 14px;
  }
`;
export const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
  margin: 0;

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;