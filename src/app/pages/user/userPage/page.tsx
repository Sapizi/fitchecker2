'use client'
import Header from "@/app/components/header/Header"
import { Wrapper } from "@/app/GlobalStyles"
import { withAuth } from "@/app/withAuth"
import { Title } from "../../admin/mainPage/MainStyles"
import { UserText } from "./styles"

const Page = () => {
  const clientName = localStorage.getItem('clientName') || 'Гость';

  return (
    <>
      <Header />
      <Wrapper>
        <Title>Главная</Title>
        <UserText>{clientName}</UserText> 
      </Wrapper>
    </>
  )
}

export default withAuth(Page)