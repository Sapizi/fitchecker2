import Link from "next/link";
import styled from "styled-components";
export const MainContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  @media (max-width: 426px){
    flex-direction: column;
  }
`;

export const Title = styled.h1`
  font-size: 46px;
  @media (max-width: 426px){
    font-size: 38px;
  }
`;

export const MainBlock = styled.div`
  width: 460px;
  height: 626px;
  border: 2px solid black;
  border-radius: 10px;
  box-sizing: border-box;
  @media (max-width: 426px){
    width: 385px;
    height: 610px;
  }
`;

export const BigText = styled.span`
  font-size: 300px;
  margin-left: 36px;
  display: block;
  @media (max-width: 426px){
    margin-left: 0px;
  } 
`;

export const CardText = styled.p`
  margin-top: 110px;
  font-size: 28px;
  margin-left: 36px;
  @media (max-width: 426px){
    margin-left: 10px;
    font-size: 24px;
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
  @media (max-width: 426px){
    margin-left: 10px;
    font-size: 24px;
    width: 360px;
  } 
  
`;

export const DateTimeBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 426px){
    margin-left: 50px;
  }
  
`;

export const DateTimeText = styled.p`
  font-size: 20px;
  color: black;
  margin: 5px 0;
  text-align: center;
`;
export const AddAdminLink = styled(Link)`
  text-align: center;
  color: black;
  &:hover {
    color: #e97c00;
  }
`;``
export const ButtonsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  
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

  @media (max-width: 426px){
    width: 360px;
    margin-left: 13px;
    margin-bottom: 20px;
  }
`;
  
