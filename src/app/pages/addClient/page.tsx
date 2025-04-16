'use client';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Header from '@/app/components/header/Header';
import { 
  ErrorMessage, FormField, FormWrapper, Input, Label, Select, SubmitButton, SuccessMessage, Form, BackLink} from './styles';
import { Title } from '../mainPage/MainStyles';
import { Wrapper } from '@/app/GlobalStyles';
type FormData = {
  name: string;
  sex: 'male' | 'female';
  age: string;
  subscription: 'monthly' | 'quarterly' | 'yearly';
};
const Page = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError: setFormError,
  } = useForm<FormData>({
    defaultValues: {
      sex: 'male',
      subscription: 'monthly'
    }
  });
  const [success, setSuccess] = useState<string | null>(null);
  const onSubmit = async (data: FormData) => {
    try {
      const age = parseInt(data.age, 10);
      if (isNaN(age) || age <= 0) {
        setFormError('age', {
          type: 'manual',
          message: 'Возраст должен быть положительным числом'
        });
        return;
      }

      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, age }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Ошибка при добавлении клиента');
      }

      setSuccess('Клиент успешно добавлен!');
      reset();
    } catch (error) {
      setFormError('root', {
        type: 'manual',
        message: `Ошибка при добавлении клиента: ${(error as Error).message}`
      });
    }
  };

  return (
    <>
      <Header />
      <Wrapper>
        <BackLink href='/pages/mainPage'>Назад</BackLink>
        <Title>Добавить клиента</Title>
        <FormWrapper>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormField>
              <Label htmlFor="name">ФИО</Label>
              <Input
                type="text"
                id="name"
                {...register('name', { required: 'Поле обязательно для заполнения' })}
                placeholder="Введите ФИО"
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.name && <ErrorMessage role="alert">{errors.name.message}</ErrorMessage>}
            </FormField>

            <FormField>
              <Label htmlFor="sex">Пол</Label>
              <Select 
                id="sex" 
                {...register('sex')}
              >
                <option value="male">Мужской</option>
                <option value="female">Женский</option>
              </Select>
            </FormField>

            <FormField>
              <Label htmlFor="age">Возраст</Label>
              <Input
                type="number"
                id="age"
                {...register('age', { 
                  required: 'Поле обязательно для заполнения',
                  validate: value => {
                    const num = parseInt(value, 10);
                    return !isNaN(num) && num > 0 || 'Возраст должен быть положительным числом';
                  }
                })}
                placeholder="Введите возраст"
                aria-invalid={errors.age ? "true" : "false"}
              />
              {errors.age && <ErrorMessage role="alert">{errors.age.message}</ErrorMessage>}
            </FormField>

            <FormField>
              <Label htmlFor="subscription">Тип абонемента</Label>
              <Select
                id="subscription"
                {...register('subscription')}
              >
                <option value="monthly">Месячный</option>
                <option value="quarterly">Квартальный</option>
                <option value="yearly">Годовой</option>
              </Select>
            </FormField>

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Добавление...' : 'Добавить клиента'}
            </SubmitButton>

            {errors.root && <ErrorMessage role="alert">{errors.root.message}</ErrorMessage>}
            {success && <SuccessMessage role="status">{success}</SuccessMessage>}
          </Form>
        </FormWrapper>
      </Wrapper>
    </>
  );
};

export default Page;