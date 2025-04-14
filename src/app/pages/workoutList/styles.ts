import styled from "styled-components";

// Контейнер для тренировок
export const WorkoutsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 15px; /* Добавлены отступы по бокам */
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

// Поле фильтра по дате
export const DateFilterInput = styled.input`
  width: 200px;
  height: 40px;
  padding-left: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  margin: 20px 0;
  background-color: #f0f0f0;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%; /* Полная ширина */
    max-width: 300px;
    height: 36px;
    font-size: 14px;
    padding-left: 8px;
    margin: 15px 0;
  }

  @media (max-width: 480px) {
    height: 32px;
    font-size: 13px;
  }
`;

export const WorkoutCard = styled.div`
  width: 100%;
  padding: 15px;
  margin-bottom: 15px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-sizing: border-box;
  border:1px solid #000;
  @media (max-width: 768px) {
    padding: 10px;
    margin-bottom: 10px;
  }
`;

// Заголовок тренировки
export const WorkoutTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 20px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 8px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

// Информация о тренировке
export const WorkoutInfo = styled.p`
  margin: 5px 0;
  font-size: 18px;
  color: #000;

  @media (max-width: 768px) {
    font-size: 13px;
    margin: 4px 0;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

// Список клиентов
export const ClientList = styled.ul`
  margin: 5px 0 0 0;
  padding-left: 20px;
  font-size: 18px;
  @media (max-width: 768px) {
    padding-left: 15px;
    margin: 4px 0 0 0;
  }
`;

export const ClientItem = styled.li`
  font-size: 14px;
  color: #000;
  font-size: 18px;
  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

// Контейнер для кнопок
export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;

  @media (max-width: 768px) {
    flex-direction: column; /* Вертикальное расположение */
    align-items: stretch;
    gap: 8px;
    margin-top: 8px;
  }
`;

// Кнопка редактирования
export const EditButton = styled.button`
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  box-sizing: border-box;
  background-color: #e97c00;
  @media (max-width: 768px) {
    padding: 6px 8px;
    font-size: 13px;
    width: 100%; /* Полная ширина */
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

// Кнопка удаления
export const DeleteButton = styled.button`
  padding: 5px 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 6px 8px;
    font-size: 13px;
    width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

// Модальное окно
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px; /* Отступы для маленьких экранов */
  box-sizing: border-box;
`;

// Содержимое модального окна
export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
  max-width: 90%; /* Адаптивная ширина */
  max-height: 80vh;
  overflow-y: auto;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 15px;
    width: 95%;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

// Заголовок модального окна
export const ModalTitle = styled.h2`
  margin: 0 0 20px 0;
  font-size: 20px;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

// Поле ввода в модальном окне
export const ModalInput = styled.input`
  width: 100%;
  height: 40px;
  padding-left: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 10px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    height: 36px;
    font-size: 14px;
    padding-left: 8px;
    margin-bottom: 8px;
  }

  @media (max-width: 480px) {
    height: 32px;
    font-size: 13px;
  }
`;

// Выпадающий список в модальном окне
export const ModalSelect = styled.select`
  width: 100%;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 10px;
  box-sizing: border-box;
  padding-left: 10px; /* Добавлено для согласованности */

  @media (max-width: 768px) {
    height: 36px;
    font-size: 14px;
    margin-bottom: 8px;
    padding-left: 8px;
  }

  @media (max-width: 480px) {
    height: 32px;
    font-size: 13px;
  }
`;

// Список клиентов в модальном окне
export const ClientListModal = styled.div`
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 10px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    max-height: 150px;
    margin-bottom: 8px;
  }

  @media (max-width: 480px) {
    max-height: 120px;
  }
`;

// Метка клиента
export const ClientLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  font-size: 14px; /* Явный размер шрифта */

  @media (max-width: 768px) {
    font-size: 13px;
    margin-bottom: 4px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

// Чекбокс клиента
export const ClientCheckbox = styled.input`
  margin-right: 10px;
  width: 18px; /* Явный размер */
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

// Контейнер кнопок в модальном окне
export const ModalButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-direction: column; /* Вертикальное расположение */
    align-items: stretch;
    gap: 8px;
  }
`;

// Кнопка сохранения
export const SaveButton = styled.button`
  padding: 10px 20px;
  background-color: #e97c00;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 8px 15px;
    font-size: 14px;
    width: 100%;
  }

  @media (max-width: 480px) {
    padding: 7px 10px;
    font-size: 13px;
  }
`;

// Кнопка отмены
export const CancelButton = styled.button`
  padding: 10px 20px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 8px 15px;
    font-size: 14px;
    width: 100%;
  }

  @media (max-width: 480px) {
    padding: 7px 10px;
    font-size: 13px;
  }
`;