import styled from 'styled-components';
export const FormWrapper = styled.div`
    max-width: 500px;
    margin: 50px auto;
    padding: 20px;
    border: 2px solid #000;
    border-radius: 10px;
    background-color: #f9f9f9;
    margin-top: 10%;
`;
export const FormTitle = styled.h2`
    font-size: 28px;
    text-align: center;
    margin-bottom: 20px;
`;
export const FormField = styled.div`
    margin-bottom: 15px;
`;
export const Label = styled.label`
    display: block;
    font-size: 16px;
    margin-bottom: 5px;
`;
export const Input = styled.input`
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;
export const Select = styled.select`
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
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
    &:hover {
        background-color: #d16b00;
    }
`;
export const ErrorMessage = styled.p`
    color: red;
    font-size: 14px;
    text-align: center;
    margin-top: 10px;
`;
export const SuccessMessage = styled.p`
    color: green;
    font-size: 14px;
    text-align: center;
    margin-top: 10px;
`;
export const Form = styled.form`
`
