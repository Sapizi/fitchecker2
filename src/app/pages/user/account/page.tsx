'use client'
import Header from "@/app/components/header/Header"
import { Title } from "../../admin/mainPage/MainStyles"
import { withAuth } from "@/app/withAuth"
import { Wrapper } from "@/app/GlobalStyles"
import { BackLink } from "../../admin/addClient/styles"
const AccountPage = () => {
    return(
        <>
            <Header/>
            <Wrapper>
                <BackLink href={'/pages/user/userPage'}>Назад</BackLink>
                <Title>Аккаунт</Title>
            </Wrapper>
        </>
    )
}
export default withAuth(AccountPage)
