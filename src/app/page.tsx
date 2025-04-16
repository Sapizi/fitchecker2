'use client'
import Header from "./components/header/Header";
import AdminLogin from "./components/authform/AuthForm";
import { GlobalStyle } from "./GlobalStyles";
const Page = () => {
    return (
        <>
            <Header/>
            <AdminLogin/>
        </>
    )
}
export default Page;