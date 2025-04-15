'use client'
import Header from "@/app/components/header/Header"
import { Wrapper } from "@/app/GlobalStyles"
import { withAuth } from "@/app/withAuth"
import { useEffect, useState } from "react"

const UserPage = () => {
    const [userName, setUserName] = useState("пользователь")
    
    useEffect(() => {
        const name = localStorage.getItem('clientName')
        if (name) {
            setUserName(name)
        }
    }, [])

    return(
        <>
            <Header/>
            <Wrapper>
                <h1>Здравствуйте, {userName}</h1>
            </Wrapper>
        </>
    )
}

export default withAuth(UserPage)