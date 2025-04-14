import styled from 'styled-components';

// Контейнер формы
export const FormWrapper = styled.div`
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  border: 2px solid #000;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-sizing: border-box; /* Учитываем padding и border в ширине */
  width: 90%; /* Адаптивная ширина для мобильных */

  @media (max-width: 768px) {
    margin: 20px auto; /* Меньший отступ сверху и снизу */
    padding: 15px; /* Уменьшенный внутренний отступ */
    margin-top: 5%; /* Меньший отступ сверху для мобильных */
  }

  @media (max-width: 480px) {
    padding: 10px; /* Еще меньший отступ для очень маленьких экранов */
  }
`;

// Заголовок формы
export const FormTitle = styled.h2`
  font-size: 28px;
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 24px; /* Меньший шрифт для мобильных */
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    font-size: 20px; /* Еще меньший шрифт для маленьких экранов */
  }
`;

// Поле формы
export const FormField = styled.div`
  margin-bottom: 15px;

  @media (max-width: 768px) {
    margin-bottom: 12px; /* Меньший отступ между полями */
  }
`;

// Метка
export const Label = styled.label`
  display: block;
  font-size: 16px;
  margin-bottom: 5px;

  @media (max-width: 768px) {
    font-size: 14px; /* Меньший шрифт для мобильных */
  }
`;

// Поле ввода
export const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box; /* Учитываем padding в ширине */

  @media (max-width: 768px) {
    padding: 7px; /* Меньший внутренний отступ */
    font-size: 14px; /* Меньший шрифт */
  }

  @media (max-width: 480px) {
    padding: 6px;
    font-size: 13px;
  }
`;

// Выпадающий список
export const Select = styled.select`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
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

// Кнопка отправки
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
    font-size: 16px; /* Меньший шрифт */
  }

  @media (max-width: 480px) {
    padding: 7px;
    font-size: 14px;
  }
`;

// Сообщение об ошибке
export const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;

  @media (max-width: 768px) {
    font-size: 12px; /* Меньший шрифт */
    margin-top: 8px;
  }
`;

// Сообщение об успехе
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

// Форма
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px; /* Добавлен небольшой отступ между элементами */

  @media (max-width: 768px) {
    gap: 8px; /* Меньший отступ для мобильных */
  }
`;