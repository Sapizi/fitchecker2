'use client';
import { useForm } from 'react-hook-form';
import React, { useEffect } from 'react';
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
        router.push('/pages/admin/mainPage');
      } else if (isClientLoggedIn) {
        router.push('/pages/user/userPage');
      }
    };
    checkAuth();
  }, [router]);

  const onLoginSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        setLoginError(result.error || 'Произошла ошибка при входе');
        return;
      }
  
      setLoginError('');
  
      if (result.role === 'admin') {
        localStorage.setItem('isAdminLoggedIn', 'true');
        router.push('/pages/admin/mainPage');
      } else if (result.role === 'client') {
        localStorage.setItem('isClientLoggedIn', 'true');
        router.push('/pages/user/userPage');
      } else {
        setLoginError('Неизвестная роль пользователя');
      }
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