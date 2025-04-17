import Link from 'next/link';
import styled from 'styled-components';
export  const BackLink = styled(Link)`
  text-decoration: none;
  color: #000;
  margin-bottom: 10px !important;
  &:hover {
    color: #e97c00;
  }
`
export const FormWrapper = styled.div`
  max-width: 500px;
  margin-left: 350px;
  padding: 20px;
  border: 2px solid #000;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-sizing: border-box; 
  width: 90%; 
  margin-top: 10%;
  @media (max-width: 1440px) {
    margin: 250px; 
    padding: 15px; 
    margin-top: 10%; 
  }
  @media (max-width: 1024px) {
    margin: 200px; 
    padding: 15px; 
    margin-top: 10%; 
  }
  @media (max-width: 768px) {
    margin: 90px; 
    padding: 15px; 
    margin-top: 5%; 
  }

  @media (max-width: 425px) {
    margin-left: 35px;
  }
`;

export const FormTitle = styled.h2`
  font-size: 28px;
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    font-size: 20px; 
  }
`;

export const FormField = styled.div`
  margin-bottom: 15px;

  @media (max-width: 768px) {
    margin-bottom: 12px; 
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 16px;
  margin-bottom: 5px;

  @media (max-width: 768px) {
    font-size: 14px; 
  }
`;


export const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box; 
  &:focus {
    outline: 2px solid #e97c00;
    outline-offset: 2px;
  }
  @media (max-width: 768px) {
    padding: 7px; 
    font-size: 14px; 
  }

  @media (max-width: 480px) {
    padding: 6px;
    font-size: 13px;
  }
`;


export const Select = styled.select`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  &:focus {
    outline: 2px solid #e97c00;
    outline-offset: 2px;
  }
  @media (max-width: 768px) {
    padding: 7px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 6px;
    font-size: 13px;
  }
`;


export const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #e97c00;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  box-sizing: border-box;

  &:hover {
    background-color: #d16b00;
  }

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 16px; 
  }

  @media (max-width: 480px) {
    padding: 7px;
    font-size: 14px;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;

  @media (max-width: 768px) {
    font-size: 12px; 
    margin-top: 8px;
  }
`;


export const SuccessMessage = styled.p`
  color: green;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;

  @media (max-width: 768px) {
    font-size: 12px;
    margin-top: 8px;
  }
`;


export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px; 

  @media (max-width: 768px) {
    gap: 8px; 
  }
`;