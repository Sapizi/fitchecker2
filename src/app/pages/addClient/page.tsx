'use client';
import { useState } from 'react';
import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '../../lib/supbase';
import Header from '@/app/components/header/Header';
import { ErrorMessage, FormField, FormTitle, FormWrapper, Input, Label, Select, SubmitButton, SuccessMessage, Form } from './styles';
import { Title } from '../mainPage/MainStyles';
import Link from 'next/link';
const Page = () => {
    const [formData, setFormData] = useState({
        name: '',
        sex: 'male',
        age: '',
        subscription: 'monthly',
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!formData.name || !formData.age || !formData.sex || !formData.subscription) {
            setError('Пожалуйста, заполните все поля');
            return;
        }
        const age = parseInt(formData.age, 10);
        if (isNaN(age) || age <= 0) {
            setError('Возраст должен быть положительным числом.');
            return;
        }
        try {
            const { error } = await supabase.from('clients').insert([
                {
                    name: formData.name,
                    sex: formData.sex,
                    age: age,
                    subscription: formData.subscription,
                },
            ]);
            if (error) {
                throw error;
            }
            setSuccess('Клиент успешно добавлен!');
            setFormData({
                name: '',
                sex: 'male',
                age: '',
                subscription: 'monthly',
            });
        } catch (error) {
            setError(`Ошибка при добавлении клиента: ${(error as PostgrestError).message}`);
        }
    };
    return (
        <>
            <Header />
            <Link href='/pages/mainPage'>Назад</Link>
            <FormWrapper>
                <FormTitle>Добавить клиента</FormTitle>
                <Form onSubmit={handleSubmit}>
                    <FormField>
                        <Label htmlFor="name">ФИО</Label>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Введите ФИО"
                        />
                    </FormField>
                    <FormField>
                        <Label htmlFor="sex">Пол</Label>
                        <Select id="sex" name="sex" value={formData.sex} onChange={handleChange}>
                            <option value="male">Мужской</option>
                            <option value="female">Женский</option>
                        </Select>
                    </FormField>
                    <FormField>
                        <Label htmlFor="age">Возраст</Label>
                        <Input
                            type="number"
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder="Введите возраст"
                        />
                    </FormField>
                    <FormField>
                        <Label htmlFor="subscription">Тип абонемента</Label>
                        <Select
                            id="subscription"
                            name="subscription"
                            value={formData.subscription}
                            onChange={handleChange}
                        >
                            <option value="monthly">Месячный</option>
                            <option value="quarterly">Квартальный</option>
                            <option value="yearly">Годовой</option>
                        </Select>
                    </FormField>
                    <SubmitButton type="submit">Добавить клиента</SubmitButton>
                </Form>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {success && <SuccessMessage>{success}</SuccessMessage>}
            </FormWrapper>
        </>
    );
};

export default Page;