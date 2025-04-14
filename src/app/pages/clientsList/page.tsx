'use client';
import { useState, useEffect } from 'react';
import { PostgrestError } from '@supabase/supabase-js';
import { useForm, SubmitHandler } from 'react-hook-form';
import Header from '@/app/components/header/Header';
import { supabase } from '../../lib/supabaseClient';
import {
  ClientList,
  ClientItem,
  ClientInfo,
  ClientText,
  LoadingText,
  ErrorText,
  Button,
  DeleteButton,
  EditForm,
  EditInput,
  EditSelect,
  ButtonGroup,
  Buttons,
} from './ClientsListStyles';
import { Wrapper } from '@/app/GlobalStyles';
import { Title } from '../mainPage/MainStyles';
import Link from 'next/link';

type Client = {
  id: number;
  created_at: string;
  name: string;
  sex: string;
  age: number;
  subscription: string;
};

type FormData = {
  name: string;
  sex: string;
  age: number;
  subscription: string;
};

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingClientId, setEditingClientId] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      sex: 'male',
      age: 0,
      subscription: 'monthly',
    },
  });

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('clients')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setClients(data as Client[]);
      } catch (error) {
        setError(`Ошибка при загрузке клиентов: ${(error as PostgrestError).message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleEdit = (client: Client) => {
    setEditingClientId(client.id);
    reset({
      name: client.name,
      sex: client.sex,
      age: client.age,
      subscription: client.subscription,
    });
  };

  const handleSave: SubmitHandler<FormData> = async (data) => {
    const age = parseInt(String(data.age), 10);
    if (isNaN(age) || age <= 0) {
      setError('Возраст должен быть положительным числом.');
      return;
    }

    try {
      const { error } = await supabase
        .from('clients')
        .update({
          name: data.name,
          sex: data.sex,
          age: age,
          subscription: data.subscription,
        })
        .eq('id', editingClientId);

      if (error) {
        throw error;
      }

      setClients((prev) =>
        prev.map((client) =>
          client.id === editingClientId ? { ...client, ...data, age } : client
        )
      );
      setEditingClientId(null);
      reset();
    } catch (error) {
      setError(`Ошибка при обновлении клиента: ${(error as PostgrestError).message}`);
    }
  };

  const handleCancel = () => {
    setEditingClientId(null);
    reset();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Вы уверены, что хотите удалить этого клиента?')) return;

    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setClients((prev) => prev.filter((client) => client.id !== id));
    } catch (error) {
      setError(`Ошибка при удалении клиента: ${(error as PostgrestError).message}`);
    }
  };

  return (
    <>
      <Header />
      <Wrapper>
        <Link href="/pages/mainPage">На главную</Link>
        <Title>Список клиентов</Title>

        {loading && <LoadingText>Загрузка...</LoadingText>}
        {error && <ErrorText>{error}</ErrorText>}

        {!loading && !error && (
          <ClientList>
            {clients.length === 0 ? (
              <ClientText>Клиентов пока нет.</ClientText>
            ) : (
              clients.map((client) => (
                <ClientItem key={client.id}>
                  {editingClientId === client.id ? (
                    <EditForm onSubmit={handleSubmit(handleSave)}>
                      <EditInput
                        {...register('name', { required: 'ФИО обязательно' })}
                        placeholder="ФИО"
                      />
                      {errors.name && <ErrorText>{errors.name.message}</ErrorText>}

                      <EditSelect {...register('sex')}>
                        <option value="male">Мужской</option>
                        <option value="female">Женский</option>
                      </EditSelect>

                      <EditInput
                        type="number"
                        {...register('age', {
                          required: 'Возраст обязателен',
                          min: { value: 1, message: 'Возраст должен быть больше 0' },
                        })}
                        placeholder="Возраст"
                      />
                      {errors.age && <ErrorText>{errors.age.message}</ErrorText>}

                      <EditSelect {...register('subscription')}>
                        <option value="monthly">Месячный</option>
                        <option value="quarterly">Квартальный</option>
                        <option value="yearly">Годовой</option>
                      </EditSelect>

                      <ButtonGroup>
                        <Button type="submit">Сохранить</Button>
                        <Button type="button" onClick={handleCancel}>
                          Отмена
                        </Button>
                      </ButtonGroup>
                    </EditForm>
                  ) : (
                    <>
                      <ClientInfo>
                        <ClientText>
                          <strong>ФИО:</strong> {client.name}
                        </ClientText>
                        <ClientText>
                          <strong>Пол:</strong> {client.sex === 'male' ? 'Мужской' : 'Женский'}
                        </ClientText>
                        <ClientText>
                          <strong>Возраст:</strong> {client.age}
                        </ClientText>
                        <ClientText>
                          <strong>Абонемент:</strong>
                          {client.subscription === 'monthly'
                            ? 'Месячный'
                            : client.subscription === 'quarterly'
                            ? 'Квартальный'
                            : 'Годовой'}
                        </ClientText>
                        <ClientText>
                          <strong>Дата добавления:</strong>{' '}
                          {new Date(client.created_at).toLocaleString('ru-RU')}
                        </ClientText>
                      </ClientInfo>
                      <Buttons>
                        <Button onClick={() => handleEdit(client)}>Редактировать</Button>
                        <DeleteButton onClick={() => handleDelete(client.id)}>
                          Удалить
                        </DeleteButton>
                      </Buttons>
                    </>
                  )}
                </ClientItem>
              ))
            )}
          </ClientList>
        )}
      </Wrapper>
    </>
  );
};

export default ClientsPage;