'use client'
import Header from "@/app/components/header/Header"
import { Wrapper } from "@/app/GlobalStyles"
import { withAuth } from "@/app/withAuth"
import { Title } from "../../admin/mainPage/MainStyles"
import { UserLink, UserText } from "./styles"
import React from "react"
import Link from "next/link"
const UserPage = () => {
    const [clientName] = React.useState(() => {
        if (typeof window !== 'undefined') {
          return localStorage.getItem('clientName') || 'Гость'
        }
        return 'Гость'
      })

  return (
    <>
      <Header />
      <Wrapper>
        <Title>Главная</Title>
        <UserLink href={'/pages/user/account'}>{clientName}</UserLink> 
      </Wrapper>
    </>
  )
}

export default withAuth(UserPage)
