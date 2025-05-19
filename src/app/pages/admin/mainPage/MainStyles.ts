import Link from "next/link";
import styled from "styled-components";
export const MainContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 894px) {
    flex-direction: column;
    align-items: center; 
    margin-left: 0; 
    padding: 0 10px; 
  }

  @media (max-width: 425px) {
    flex-direction: column;
    align-items: center;
    margin-left: 0; 
    padding: 0 5px;
  }
`;

export const Title = styled.h1`
  font-size: 46px;
  margin-bottom: 10px;
  @media (max-width: 768px){
    margin-left: 20px;
  }
  @media (max-width: 520px){
    font-size: 40px;
  }
  @media (max-width: 426px){
    font-size: 38px;
  }
  @media (max-width: 375px){
    font-size: 36px;
  }
  @media (max-width: 320px){
    font-size: 28px;
  }
`;

export const MainBlock = styled.div`
  width: 460px;
  height: 626px;
  border: 2px solid black;
  border-radius: 10px;
  box-sizing: border-box;
  @media (max-width: 1024px){
    width: 420px;
    height: 610px;
  }
  @media (max-width: 768px){
    width: 460px;
    height: 610px;
  }
  @media (max-width: 426px){
    width: 385px;
    height: 610px;
  }
  @media (max-width: 375px){
    width: 365px;
    height: 610px;
  }
  @media (max-width: 375px){
    width: 300px;
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
  @media (max-width: 1024px){
    margin-left: 10px;
    font-size: 24px;
  } 
  @media (max-width: 768px){
    margin-left: 36px;
    font-size: 26px;
  } 
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
  font-size: 28px;
  text-decoration: none;
  margin-top: 26px;
  box-sizing: border-box;
  transition: 0.3s;
  &:hover {
    background-color: #ca6c00;
  }
  @media (max-width: 1440px){
    height: 85px;
    width: 350px;
    margin-right: 30px;
  } 
  @media (max-width: 1024px){
    height: 85px;
    width: 290px;
    margin-right: 30px;
  } 
  @media (max-width: 768px){
    margin-left: 36px;
    width: 384px;
  } 
  @media (max-width: 426px){
    margin-left: 10px;
    font-size: 24px;
    width: 360px;
  } 
  @media (max-width: 426px){
    
    width: 360px;
  } 
  @media (max-width: 375px){
    
    width: 275px;
    height: 75px;
  } 
  @media (max-width: 320px){
    
    width: 275px;
    height: 70px;
  } 
  
`;

export const DateTimeBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  
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
  margin-bottom: 20px;
  
`;

export const LinkButton = styled(Link)`
  display: block;
  text-align: center;
  
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
  transition: 0.3s;
  &:hover {
    background-color: #ca6c00;
  }
  @media (max-width: 1024px){
    width: 330px;
    height: 165px;
  }
  @media (max-width: 426px){
    width: 360px;
    margin-left: 0px;

  }
  @media (max-width: 375px){
    width: 340px;
    margin-left: 0;
  }
  @media (max-width: 375px){
    width: 300px;
    margin-left: 0;
    font-size: 24px;
  }
`;
  
//©sapizi