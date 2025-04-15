import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { supabase } from '../../lib/supabaseClient';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
const AllMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; 
  padding: 20px; 
  box-sizing: border-box;
`;

const Forma = styled.form`
  width: 90%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px; 
  background-color: #f7f7f7;
  border-radius: 8px;
  border: 1px solid black;
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 20px; 
    gap: 15px; 
  }
`;

const Title = styled.h2`
  font-size: 24px;
  text-align: center;
  color: #333;
  margin-bottom: 10px;
  @media (max-width: 600px) {
    font-size: 20px;
  }
`;
const MainInput = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  width: 100%; 
  box-sizing: border-box;
  &:focus {
    border-color: #e97c00;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
  }
  @media (max-width: 600px) {
    padding: 10px; 
    font-size: 14px; 
  }
`;
const MainButton = styled.button`
  padding: 12px;
  font-size: 16px;
  background-color: #e97c00;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%; 
  box-sizing: border-box;
  &:hover {
    background-color: #ca6c00;
  }
  @media (max-width: 600px) {
    padding: 10px;
    font-size: 14px;
  }
`;
const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
  margin: 0;

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;
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

      const { data: admin, error: adminError } = await supabase
        .from('admins')
        .select('username, password')
        .eq('username', username)
        .single();
  
      if (admin && admin.password === password) {
        setLoginError('');
        localStorage.setItem('isAdminLoggedIn', 'true');
        router.push('/pages/mainPage');
        return;
      }

      const { data: client, error: clientError } = await supabase
        .from('clients')
        .select('name, password')
        .eq('name', username)
        .single();
  
      if (client && client.password === password) {
        setLoginError('');
        localStorage.setItem('isClientLoggedIn', 'true');
        localStorage.setItem('clientName', client.name); 
        router.push('/pages/userPage');
        return;
      }

      setLoginError('Неверный логин или пароль');
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