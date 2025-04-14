import styled from "styled-components";

// Контейнер для формы
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; /* Полная ширина для мобильных */
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0 10px; /* Добавлены отступы по бокам для мобильных */
  }
`;

// Форма добавления
export const AddForm = styled.form`
  width: 500px;
  max-width: 90%; /* Адаптивная ширина */
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
    margin: 20px auto; /* Меньший внешний отступ */
    padding: 15px; /* Меньший внутренний отступ */
    margin-top: 3%; /* Уменьшен отступ сверху */
    gap: 8px; /* Меньший зазор между элементами */
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

// Поле ввода
export const AddInput = styled.input`
  width: 100%; /* Полная ширина */
  height: 40px;
  padding-left: 10px;
  border: none;
  font-size: 16px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    height: 36px; /* Меньшая высота */
    font-size: 14px; /* Меньший шрифт */
    padding-left: 8px;
  }

  @media (max-width: 480px) {
    height: 32px;
    font-size: 13px;
  }
`;

// Кнопка добавления
export const AddButton = styled.button`
  font-size: 16px;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #e97c00;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%; /* Полная ширина для единообразия */
  box-sizing: border-box;

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

// Выпадающий список тренеров
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

// Список клиентов
export const ClientList = styled.div`
  width: 90%;
  max-height: 150px;
  overflow-y: auto;
  margin-top: 10px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%; /* Полная ширина */
    max-height: 120px; /* Меньшая высота для компактности */
    padding: 8px;
    margin-top: 8px;
  }

  @media (max-width: 480px) {
    max-height: 100px;
    padding: 6px;
  }
`;

// Заголовок списка клиентов
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

// Метка клиента
export const ClientLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  @media (max-width: 768px) {
    margin-bottom: 4px;
    font-size: 14px; /* Уменьшен размер текста */
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

// Чекбокс клиента
export const ClientCheckbox = styled.input`
  margin-right: 10px;
  width: 18px; /* Явный размер для единообразия */
  height: 18px;

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