import styled from "styled-components";
export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const AddForm = styled.form`
    width: 500px;
    margin: 50px auto;
    padding: 20px;
    border: 2px solid #000;
    border-radius: 10px;
    background-color: #f9f9f9;
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`
export const AddInput = styled.input`
    width: 98%;
    height: 40px;
    padding-left: 10px;
    border: none;
    font-size: 16px;

`
export const AddButton = styled.button`
    font-size: 16px;
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #e97c00;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`






export const TrainerSelect = styled.select`
  width: 100%;
  height: 40px;
  margin-top: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  padding-left: 10px;
`;

export const ClientList = styled.div`
  width: 90%;
  max-height: 150px;
  overflow-y: auto;
  margin-top: 10px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
`;

export const ClientListTitle = styled.h4`
  margin: 0 0 10px 0;
  font-size: 16px;
  font-weight: 500;
`;

export const ClientLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

export const ClientCheckbox = styled.input`
  margin-right: 10px;
`;

