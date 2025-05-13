'use client'
import Header from "@/app/components/header/Header"
import { Title } from "../../admin/mainPage/MainStyles"
import { withAuth } from "@/app/withAuth"

const AccountPage = () => {
    return(
        <>
            <Header/>
            <Title>Аккаунт</Title>
        </>
    )
}
export default withAuth(AccountPage)