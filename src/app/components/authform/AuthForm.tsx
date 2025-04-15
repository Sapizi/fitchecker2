import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { supabase } from '../../lib/supabaseClient';
import React, { useEffect } from 'react';
import bcrypt from 'bcryptjs';
import { useRouter } from 'next/navigation';
import { AllMain, ErrorMessage, Forma, MainButton, MainInput, Title } from './AuthFormStyles';
interface LoginFormData {
  username: string;
  password: string;
}
export default function AdminLogin() {
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>({
    defaultValues: { username: '', password: '' },
  });
  const [loginError, setLoginError] = React.useState<string>('');
  const router = useRouter();
  useEffect(() => {
    const checkAuth = () => {
      const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
      const isClientLoggedIn = localStorage.getItem('isClientLoggedIn') === 'true';
      if (isAdminLoggedIn) {
        router.push('/pages/mainPage');
      } else if (isClientLoggedIn) {
        router.push('/pages/userPage');
      }
    };
    checkAuth();
  }, [router]);
  const onLoginSubmit = async (data: LoginFormData) => {
    try {
      const { username, password } = data;
  
      // 1. Проверка в таблице admins
      const { data: admin, error: adminError } = await supabase
        .from('admins')
        .select('username, password')
        .eq('username', username)
        .single();
  
      if (admin) {
        const isAdminPasswordCorrect = await bcrypt.compare(password, admin.password);
        if (isAdminPasswordCorrect) {
          setLoginError('');
          localStorage.setItem('isAdminLoggedIn', 'true');
          router.push('/pages/mainPage');
          return;
        } else {
          setLoginError('Неверный пароль');
          return;
        }
      }
  
      // 2. Проверка в таблице clients (без bcrypt)
      const { data: client, error: clientError } = await supabase
        .from('clients')
        .select('name, password')
        .eq('name', username)
        .single();
  
      if (client) {
        if (client.password === password) {
          setLoginError('');
          localStorage.setItem('isClientLoggedIn', 'true');
          localStorage.setItem('clientName', client.name);
          router.push('/pages/userPage');
          return;
        } else {
          setLoginError('Неверный пароль');
          return;
        }
      }
  
      setLoginError('Пользователь не найден');
    } catch (err) {
      setLoginError('Произошла ошибка при входе');
      console.error(err);
    }
  };
  
  return (
    <AllMain>
      <Forma onSubmit={handleSubmitLogin(onLoginSubmit)}>
        <Title>Вход</Title>
        <MainInput
          type="text"
          placeholder="Логин"
          {...registerLogin('username', { required: 'Логин обязателен' })}
        />
        {loginErrors.username && loginErrors.username.message && (
          <ErrorMessage>{loginErrors.username.message}</ErrorMessage>
        )}
        <MainInput
          type="password"
          placeholder="Пароль"
          {...registerLogin('password', { required: 'Пароль обязателен' })}
        />
        {loginErrors.password && loginErrors.password.message && (
          <ErrorMessage>{loginErrors.password.message}</ErrorMessage>
        )}
        <MainButton type="submit">Войти</MainButton>
        {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
      </Forma>
    </AllMain>
  );
}