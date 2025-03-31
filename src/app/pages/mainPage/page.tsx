'use client';
import { useState, useEffect } from 'react';
import { PostgrestError } from '@supabase/supabase-js';
import Header from "@/app/components/header/Header";
import { BigText, CardButton, CardText, MainBlock, MainContent, Title, DateTimeBlock, DateTimeText } from "./MainStyles";
import { Wrapper } from "@/app/GlobalStyles";
import { supabase } from '../../lib/supbase';

const Main = () => {
    const [clientCount, setClientCount] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentDateTime, setCurrentDateTime] = useState({ date: '', time: '' });

    // Получение количества клиентов
    useEffect(() => {
        const fetchClientCount = async () => {
            try {
                setLoading(true);
                const { data, error, count } = await supabase
                    .from('clients')
                    .select('*', { count: 'exact' });
                if (error) {
                    throw error;
                }
                setClientCount(count ?? 0);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', (error as PostgrestError).message);
            } finally {
                setLoading(false);
            }
        };
        fetchClientCount();
    }, []);
    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const date = now.toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            }).replace(/\./g, '/');
            const time = now.toLocaleTimeString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            });
            setCurrentDateTime({ date, time });
        };
        updateDateTime(); 
        const interval = setInterval(updateDateTime, 1000); 
        return () => clearInterval(interval); 
    }, []);

    return (
        <>
            <Header />
            <Wrapper>
                <Title>Главная</Title>
                <MainContent>
                    <MainBlock>
                        {loading ? (
                            <BigText>Загрузка...</BigText>
                        ) : (
                            <BigText>{clientCount ?? 0}</BigText>
                        )}
                        <CardText>Количество клиентов</CardText>
                        <CardButton href="/pages/addClient">Добавить</CardButton>
                    </MainBlock>
                    <DateTimeBlock>
                        <DateTimeText>Сегодняшняя дата</DateTimeText>
                        <DateTimeText>{currentDateTime.date}</DateTimeText>
                        <DateTimeText>{currentDateTime.time}</DateTimeText>
                    </DateTimeBlock>
                    
                </MainContent>
            </Wrapper>
        </>
    );
};

export default Main;