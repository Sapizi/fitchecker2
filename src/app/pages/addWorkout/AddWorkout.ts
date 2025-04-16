import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0 10px; 
  }
`;

export const AddForm = styled.form`
  width: 500px;
  max-width: 90%; 
  margin: 50px auto;
  padding: 20px;
  border: 2px solid #000;
  border-radius: 10px;
  background-color: #f9f9f9;
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin: 20px auto; 
    padding: 15px; 
    margin-top: 3%; 
    gap: 8px; 
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;


export const AddInput = styled.input`
  width: 100%; 
  height: 40px;
  padding-left: 10px;
  border: none;
  font-size: 16px;
  box-sizing: border-box;
  border-radius: 4px;
  &:focus {
    outline: 2px solid #e97c00;
    outline-offset: 2px;
  }
  @media (max-width: 768px) {
    height: 36px;
    font-size: 14px; 
    padding-left: 8px;
  }

  @media (max-width: 480px) {
    height: 32px;
    font-size: 13px;
  }
`;

export const AddButton = styled.button`
  font-size: 16px;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #e97c00;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%; 
  box-sizing: border-box;
  &:hover {
    background-color: #ca6c00;
  }
  @media (max-width: 768px) {
    margin-top: 15px;
    padding: 8px 15px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 7px 10px;
    font-size: 13px;
  }
`;

export const TrainerSelect = styled.select`
  width: 100%;
  height: 40px;
  margin-top: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  padding-left: 10px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    height: 36px;
    font-size: 14px;
    margin-top: 8px;
    padding-left: 8px;
  }

  @media (max-width: 480px) {
    height: 32px;
    font-size: 13px;
  }
`;

export const ClientList = styled.div`
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  margin-top: 10px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
    max-height: 120px; 
    padding: 8px;
    margin-top: 8px;
  }

  @media (max-width: 480px) {
    max-height: 100px;
    padding: 6px;
  }
`;

export const ClientListTitle = styled.h4`
  margin: 0 0 10px 0;
  font-size: 16px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 8px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const ClientLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  @media (max-width: 768px) {
    margin-bottom: 4px;
    font-size: 14px; 
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const ClientCheckbox = styled.input`
  margin-right: 10px;
  width: 18px; 
  height: 18px;
  &:checked{
    accent-color: #e97c00;
  }
  @media (max-width: 768px) {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }

  @media (max-width: 480px) {
    width: 14px;
    height: 14px;
  }
`;