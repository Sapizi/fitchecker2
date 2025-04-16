import Link from "next/link";
import styled from "styled-components";
export const MainContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap; 

  @media (max-width: 768px) {
    flex-direction: column; 
    align-items: center;
    gap: 15px;
  }
`;

export const Title = styled.h1`
  font-size: 46px;

  @media (max-width: 768px) {
    font-size: 32px; 
    text-align: center;
  }
`;

export const MainBlock = styled.div`
  width: 460px;
  height: 626px;
  border: 2px solid black;
  border-radius: 10px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 90%; 
    max-width: 400px;
    height: auto; 
    padding: 20px; 
  }
`;

export const BigText = styled.span`
  font-size: 300px;
  margin-left: 36px;
  display: block; 

  @media (max-width: 768px) {
    font-size: 150px; 
    margin-left: 0;
    text-align: center;
  }
`;

export const CardText = styled.p`
  margin-top: 110px;
  font-size: 28px;
  margin-left: 36px;

  @media (max-width: 768px) {
    margin-top: 20px; 
    font-size: 24px;
    margin-left: 0;
    text-align: center;
  }
`;


export const CardButton = styled(Link)`
  display: block;
  text-align: center;
  margin-left: 33px;
  width: 384px;
  height: 100px;
  background-color: #e97c00;
  align-content: center;
  border-radius: 10px;
  color: white;
  font-size: 36px;
  text-decoration: none;
  margin-top: 26px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 90%; 
    max-width: 350px;
    height: 80px; 
    margin-left: auto;
    margin-right: auto;
    font-size: 24px;
  }
`;

export const DateTimeBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 90%;
    max-width: 400px;
  }
`;

export const DateTimeText = styled.p`
  font-size: 20px;
  color: black;
  margin: 5px 0;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const ButtonsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    width: 90%;
    max-width: 400px;
    align-items: center;
    gap: 15px;
  }
`;

export const LinkButton = styled(Link)`
  display: block;
  text-align: center;
  margin-left: 33px;
  width: 384px;
  height: 165px;
  background-color: #e97c00;
  align-content: center;
  border-radius: 10px;
  color: white;
  font-size: 28px;
  text-decoration: none;
  margin-top: 26px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 90%;
    max-width: 350px;
    height: 100px; 
    margin-left: auto;
    margin-right: auto;
    font-size: 24px;
    margin-top: 0;
  }
`;