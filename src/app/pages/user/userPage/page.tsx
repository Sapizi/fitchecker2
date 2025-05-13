'use client'

import Header from "@/app/components/header/Header"
import { Wrapper } from "@/app/GlobalStyles"
import { withAuth } from "@/app/withAuth"
import { Title } from "../../admin/mainPage/MainStyles"

const Page = () => {
    return (
        <>
        <Header/>
        <Wrapper>
            <Title>Главная</Title>
            
        </Wrapper>
        </>
    )
}
export default withAuth(Page)