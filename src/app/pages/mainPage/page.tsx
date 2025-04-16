'use client';
import { useState, useEffect } from 'react';
import { PostgrestError } from '@supabase/supabase-js';
import Header from "@/app/components/header/Header";
import { BigText, CardButton, CardText, MainBlock, MainContent, Title, DateTimeBlock, DateTimeText, ButtonsBlock, LinkButton, AddAdminLink } from "./MainStyles";
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
                timeZone: 'UTC',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            }).replace(/\./g, '/');
            const time = now.toLocaleTimeString('ru-RU', {
                timeZone: 'UTC',
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
            const now = new Date();
            const startOfDay = new Date(now.setUTCHours(0, 0, 0, 0)); 
            const endOfDay = new Date(now.setUTCHours(23, 59, 59, 999));
    
            console.log('Start of day (UTC):', startOfDay.toISOString());
            console.log('End of day (UTC):', endOfDay.toISOString());
            console.log('Current date:', now.toISOString());
    
            const { data: workouts, error } = await supabase
                .from('workouts')
                .select('id, workout_name, workout_datetime, trainers(trainer_name)')
                .gte('workout_datetime', startOfDay.toISOString())
                .lte('workout_datetime', endOfDay.toISOString())
                .order('workout_datetime', { ascending: true })
                .limit(5);
    
            if (error) {
                console.error('Ошибка при загрузке занятий:', error.message);
            } else {
                console.log('Занятия на сегодня:', workouts);
                setTodayWorkouts(workouts || []);
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
                                            timeZone: 'UTC',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })} — {workout.workout_name} 
                                    </DateTimeText>
                                ))
                            )}

                        
                        <AddAdminLink href={'/pages/addAdmin'}>Добавить администратора</AddAdminLink>
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
