'use client';
import { useState, useEffect } from 'react';
import { PostgrestError } from '@supabase/supabase-js';
import Header from "@/app/components/header/Header";
import { BigText, CardButton, CardText, MainBlock, MainContent, Title, DateTimeBlock, DateTimeText, ButtonsBlock, LinkButton } from "./MainStyles";
import { Wrapper } from "@/app/GlobalStyles";
import { supabase } from '../../lib/supabaseClient';
import { withAuth } from '@/app/withAuth';
import Link from 'next/link';

const Main = () => {
    const [clientCount, setClientCount] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentDateTime, setCurrentDateTime] = useState({ date: '', time: '' });
    const [todayWorkouts, setTodayWorkouts] = useState<any[]>([]);
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

    useEffect(() => {
        const fetchTodayWorkouts = async () => {
            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);

            const { data: workouts, error } = await supabase
                .from('workouts')
                .select('id, workout_name, workout_datetime, trainers(trainer_name)')
                .gte('workout_datetime', startOfDay.toISOString())
                .lte('workout_datetime', endOfDay.toISOString())
                .order('workout_datetime', { ascending: true })
                .limit(3);

            if (error) {
                console.error('Ошибка при загрузке занятий:', error.message);
            } else {
                setTodayWorkouts(workouts);
            }
        };

        fetchTodayWorkouts();
    }, []);

    return (
        <>
            <Header />
            <Wrapper>
                <Title>Главная</Title>
                <MainContent>
                    <MainBlock>
                        {loading ? (
                            <BigText></BigText>
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
                        <DateTimeText>Занятия на сегодня:</DateTimeText>
                        {todayWorkouts.length === 0 ? (
                            <DateTimeText>Занятий нет</DateTimeText>
                        ) : (
                            todayWorkouts.map((workout) => (
                                <DateTimeText key={workout.id}>
                                    {new Date(workout.workout_datetime).toLocaleTimeString('ru-RU', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })} — {workout.workout_name} ({workout.trainers?.name || 'Тренер не указан'})
                                </DateTimeText>
                            ))
                        )}

                        
                        <Link href={'/pages/addAdmin'}>Добавить администратора</Link>
                    </DateTimeBlock>

                    <ButtonsBlock>
                        <LinkButton href='/pages/addWorkout'>Добавить занятие</LinkButton>
                        <LinkButton href='/pages/clientsList'>Список клиентов</LinkButton>
                        <LinkButton href='/pages/workoutList'>Список занятий</LinkButton>
                    </ButtonsBlock>
                </MainContent>
            </Wrapper>
        </>
    );
};

export default withAuth(Main, true);
