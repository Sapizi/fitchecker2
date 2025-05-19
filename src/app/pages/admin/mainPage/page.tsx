'use client';
import { useState, useEffect } from 'react';
import Header from '@/app/components/header/Header';
import { BigText, CardButton, CardText, MainBlock, MainContent, Title, DateTimeBlock, DateTimeText, ButtonsBlock, LinkButton, AddAdminLink } from './MainStyles';
import { Wrapper } from '@/app/GlobalStyles';
import { withAuth } from '@/app/withAuth';

const Main = () => {
  const [clientCount, setClientCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentDateTime, setCurrentDateTime] = useState({ date: '', time: '' });
  const [todayWorkouts, setTodayWorkouts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchClientCount = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/clients/count');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Ошибка при загрузке количества клиентов');
        }

        setClientCount(data.count);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        setError(`Ошибка при загрузке количества клиентов: ${(error as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchClientCount();
  }, []);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const utcPlus5 = new Date(now.getTime() + 0 * 60 * 60 * 1000);
  
      const date = utcPlus5.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).replace(/\./g, '/');
  
      const time = utcPlus5.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
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
      try {
        const response = await fetch('/api/workout/today');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Ошибка при загрузке занятий');
        }

        setTodayWorkouts(data);
      } catch (error) {
        console.error('Ошибка при загрузке занятий:', error);
        setError(`Ошибка при загрузке занятий: ${(error as Error).message}`);
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
              <BigText>0</BigText>
            ) : error ? (
              <BigText style={{ color: 'red' }}>{error}</BigText>
            ) : (
              <BigText>{clientCount ?? 0}</BigText>
            )}
            <CardText>Количество клиентов</CardText>
            <CardButton href="/pages/admin/addClient">Добавить</CardButton>
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
            <AddAdminLink href={'/pages/admin/addAdmin'}>Добавить администратора</AddAdminLink>
          </DateTimeBlock>

          <ButtonsBlock>
            <LinkButton href='/pages/admin/addWorkout'>Добавить тренировку</LinkButton>
            <LinkButton href='/pages/admin/clientsList'>Список клиентов</LinkButton>
            <LinkButton href='/pages/admin/workoutList'>Список тренировок</LinkButton>
          </ButtonsBlock>
        </MainContent>
      </Wrapper>
    </>
  );
};
export default withAuth(Main, true);
//©sapizi