'use client'

import { useState } from "react"
import Header from "@/app/components/header/Header"
import { Wrapper } from "@/app/GlobalStyles"
import { Title } from "../mainPage/MainStyles"
import { withAuth } from "@/app/withAuth"
import { supabase } from "../../lib/supabaseClient"
import bcrypt from "bcryptjs"
import { Form } from "react-hook-form"
import { Forma, MainButton, MainInput } from "@/app/components/authform/AuthFormStyles"
import { FormContainer } from "../addWorkout/AddWorkout"
import Link from "next/link"
import { BackLink, Label } from "../addClient/styles"

const AddAdmin = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      const { error } = await supabase.from("admins").insert([
        {
          username,
          password: hashedPassword,
          role: "admin",
        }
      ])

      if (error) {
        console.error(error)
        setMessage("Ошибка при добавлении администратора")
      } else {
        setMessage("Администратор добавлен успешно")
        setUsername("")
        setPassword("")
      }
    } catch (err) {
      console.error(err)
      setMessage("Произошла ошибка")
    }
  }

  return (
    <>
      <Header />
      <Wrapper>
        <BackLink href={'/pages/mainPage'}>На главную</BackLink>
        <Title>Добавление администратора</Title>
        <FormContainer>
          <Forma onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column'}}>
            <Label>Имя пользователя</Label>
            <MainInput
              type="text"
              placeholder="Имя пользователя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Label>Пароль</Label>
            <MainInput
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <MainButton type="submit">Добавить</MainButton>
          </Forma>
          {message && <p>{message}</p>}
        </FormContainer>
      </Wrapper>
    </>
  )
}

export default withAuth(AddAdmin, true)
