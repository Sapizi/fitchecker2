import styled from "styled-components";


export const ClientList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%; 
  box-sizing: border-box;

  @media (max-width: 768px) {
    gap: 10px; 
  }
`;

export const ClientItem = styled.li`
  border: 2px solid #000;
  border-radius: 10px;
  padding: 15px;
  background-color: #f9f9f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column; 
    align-items: flex-start;
    padding: 10px;
    gap: 10px; 
  }
`;

export const ClientInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%; 
  @media (max-width: 768px) {
    gap: 4px;
  }
`;


export const ClientText = styled.p`
  font-size: 18px;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 16px; 
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const LoadingText = styled.p`
  font-size: 24px;
  text-align: center;
  color: #666;

  @media (max-width: 768px) {
    font-size: 20px; 
  }
  @media (max-width: 480px) {
    font-size: 18px;
  }
`;


export const ErrorText = styled.p`
  font-size: 18px;
  text-align: center;
  color: red;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;


export const Button = styled.button`
  width: 70%;
  padding: 8px 16px;
  margin-left: 10px;
  background-color: #e97c00;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px; 
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 7px 12px;
    margin-left: 0; 
    font-size: 14px;
    width: 100%; 
  }

  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 13px;
  }
`;


export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

export const EditInput = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 7px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 6px;
    font-size: 13px;
  }
`;


export const EditSelect = styled.select`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 7px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 6px;
    font-size: 13px;
  }
`;


export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end; 

  @media (max-width: 768px) {
    flex-direction: column; 
    align-items: stretch; 
    gap: 8px;
  }
`;
export const Buttons = styled.div`
  display: flex;
  gap: 10px;
`
export const DeleteButton = styled(Button)`
  background-color: #ff4d4d;
  width: 70%;
  &:hover {
    background-color: #e60000;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;