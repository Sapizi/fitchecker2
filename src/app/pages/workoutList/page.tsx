'use client';
import Header from '@/app/components/header/Header';
import Link from 'next/link';
import { Title } from '../mainPage/MainStyles';
import { Wrapper } from '@/app/GlobalStyles';
import { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  ButtonContainer,
  CancelButton,
  ClientCheckbox,
  ClientItem,
  ClientLabel,
  ClientList,
  ClientListModal,
  DateFilterInput,
  DeleteButton,
  EditButton,
  Modal,
  ModalButtonContainer,
  ModalContent,
  ModalInput,
  ModalSelect,
  ModalTitle,
  SaveButton,
  WorkoutCard,
  WorkoutInfo,
  WorkoutsContainer,
  WorkoutTitle,
} from './styles';

interface Trainer {
  id: number;
  trainer_name: string;
}

interface Client {
  id: number;
  name: string;
}

interface Workout {
  id: number;
  workout_name: string;
  workout_datetime: string;
  trainer_id: number;
  trainers: Trainer;
  workout_clients: { client_id: number; clients: Client }[];
}

type FormData = {
  workout_name: string;
  workout_datetime: string;
  trainer_id: number;
};

const WorkoutsList = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);
  const [editSelectedClients, setEditSelectedClients] = useState<number[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      workout_name: '',
      workout_datetime: '',
      trainer_id: 0,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data: trainersData, error: trainersError } = await supabase
        .from('trainers')
        .select('id, trainer_name');
      if (trainersError) {
        console.error('Ошибка загрузки тренеров:', trainersError);
      } else {
        setTrainers(trainersData || []);
      }

      const { data: clientsData, error: clientsError } = await supabase
        .from('clients')
        .select('id, name');
      if (clientsError) {
        console.error('Ошибка загрузки клиентов:', clientsError);
      } else {
        setClients(clientsData || []);
      }

      const { data: workoutsData, error: workoutsError } = await supabase
        .from('workouts')
        .select(`
          id,
          workout_name,
          workout_datetime,
          trainer_id,
          trainers:trainer_id (trainer_name),
          workout_clients (client_id, clients:client_id (name))
        `);

      if (workoutsError) {
        console.error('Ошибка загрузки тренировок:', workoutsError);
      } else {
        const formattedWorkouts: Workout[] = workoutsData.map((workout: any) => {
          const trainer = trainersData?.find((t) => t.id === workout.trainer_id);
          const formattedTrainer = trainer
            ? { id: trainer.id, trainer_name: trainer.trainer_name }
            : { id: workout.trainer_id, trainer_name: `Тренер не найден (ID: ${workout.trainer_id})` };

          const formattedClients = workout.workout_clients.map((wc: any) => {
            const client = clientsData?.find((c) => c.id === wc.client_id);
            return {
              client_id: wc.client_id,
              clients: client
                ? { id: client.id, name: client.name }
                : { id: wc.client_id, name: `Клиент не найден (ID: ${wc.client_id})` },
            };
          });

          return {
            id: workout.id,
            workout_name: workout.workout_name,
            workout_datetime: workout.workout_datetime,
            trainer_id: workout.trainer_id,
            trainers: formattedTrainer,
            workout_clients: formattedClients,
          };
        });
        setWorkouts(formattedWorkouts);
      }
    };

    fetchData();
  }, []);

  const filteredWorkouts = selectedDate
    ? workouts.filter((workout) =>
        new Date(workout.workout_datetime).toISOString().split('T')[0] === selectedDate
      )
    : workouts;

  const handleEdit = (workout: Workout) => {
    setEditingWorkout(workout);
    setEditSelectedClients(workout.workout_clients.map((wc) => wc.client_id));
    reset({
      workout_name: workout.workout_name,
      workout_datetime: new Date(workout.workout_datetime).toISOString().slice(0, 16),
      trainer_id: workout.trainer_id,
    });
  };

  const handleSave: SubmitHandler<FormData> = async (data) => {
    if (!editingWorkout) return;

    try {
      const { error: updateError } = await supabase
        .from('workouts')
        .update({
          workout_name: data.workout_name,
          workout_datetime: data.workout_datetime,
          trainer_id: data.trainer_id,
        })
        .eq('id', editingWorkout.id);

      if (updateError) {
        console.error('Ошибка обновления тренировки:', updateError);
        alert('Ошибка при обновлении тренировки!');
        return;
      }

      await supabase
        .from('workout_clients')
        .delete()
        .eq('workout_id', editingWorkout.id);

      if (editSelectedClients.length > 0) {
        const workoutClients = editSelectedClients.map((clientId) => ({
          workout_id: editingWorkout.id,
          client_id: clientId,
        }));

        const { error: clientsError } = await supabase
          .from('workout_clients')
          .insert(workoutClients);

        if (clientsError) {
          console.error('Ошибка добавления клиентов:', clientsError);
          alert('Тренировка обновлена, но произошла ошибка при добавлении клиентов!');
          return;
        }
      }

      const { data: updatedWorkoutData, error: fetchError } = await supabase
        .from('workouts')
        .select(`
          id,
          workout_name,
          workout_datetime,
          trainer_id,
          trainers:trainer_id (trainer_name),
          workout_clients (client_id, clients:client_id (name))
        `)
        .eq('id', editingWorkout.id)
        .single();

      if (fetchError) {
        console.error('Ошибка получения обновленной тренировки:', fetchError);
        alert('Тренировка обновлена, но не удалось обновить список!');
        return;
      }

      if (updatedWorkoutData) {
        const trainer = trainers.find((t) => t.id === updatedWorkoutData.trainer_id);
        const formattedTrainer = trainer
          ? { id: trainer.id, trainer_name: trainer.trainer_name }
          : {
              id: updatedWorkoutData.trainer_id,
              trainer_name: `Тренер не найден (ID: ${updatedWorkoutData.trainer_id})`,
            };

        const formattedClients = updatedWorkoutData.workout_clients.map((wc: any) => {
          const client = clients.find((c) => c.id === wc.client_id);
          return {
            client_id: wc.client_id,
            clients: client
              ? { id: client.id, name: client.name }
              : { id: wc.client_id, name: `Клиент не найден (ID: ${wc.client_id})` },
          };
        });

        const updatedWorkout: Workout = {
          id: updatedWorkoutData.id,
          workout_name: updatedWorkoutData.workout_name,
          workout_datetime: updatedWorkoutData.workout_datetime,
          trainer_id: updatedWorkoutData.trainer_id,
          trainers: formattedTrainer,
          workout_clients: formattedClients,
        };

        setWorkouts(workouts.map((w) => (w.id === editingWorkout.id ? updatedWorkout : w)));
      }

      alert('Тренировка успешно обновлена!');
      setEditingWorkout(null);
      setEditSelectedClients([]);
      reset();
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при сохранении тренировки!');
    }
  };

  const handleClientCheckboxChange = (clientId: number) => {
    setEditSelectedClients((prev) =>
      prev.includes(clientId) ? prev.filter((id) => id !== clientId) : [...prev, clientId]
    );
  };

  const handleDelete = async (workoutId: number) => {
    if (!confirm('Вы уверены, что хотите удалить эту тренировку?')) return;

    const { error: deleteError } = await supabase
      .from('workouts')
      .delete()
      .eq('id', workoutId);

    if (deleteError) {
      console.error('Ошибка удаления тренировки:', deleteError);
      alert('Ошибка при удалении тренировки!');
      return;
    }

    setWorkouts(workouts.filter((workout) => workout.id !== workoutId));
    alert('Тренировка успешно удалена!');
  };

  return (
    <>
      <Header />
      <Wrapper>
        <Link href="/pages/mainPage">На главную</Link>
        <Title>Список тренировок</Title>
        <WorkoutsContainer>
          <DateFilterInput
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          {filteredWorkouts.length > 0 ? (
            filteredWorkouts.map((workout) => (
              <WorkoutCard key={workout.id}>
                <WorkoutTitle>{workout.workout_name}</WorkoutTitle>
                <WorkoutInfo>
                  Дата и время: {new Date(workout.workout_datetime).toLocaleString()}
                </WorkoutInfo>
                <WorkoutInfo>Тренер: {workout.trainers.trainer_name}</WorkoutInfo>
                <WorkoutInfo>Участники:</WorkoutInfo>
                <ClientList>
                  {workout.workout_clients.length > 0 ? (
                    workout.workout_clients.map((wc) => (
                      <ClientItem key={wc.client_id}>{wc.clients.name}</ClientItem>
                    ))
                  ) : (
                    <ClientItem>Нет участников</ClientItem>
                  )}
                </ClientList>
                <ButtonContainer>
                  <EditButton onClick={() => handleEdit(workout)}>Редактировать</EditButton>
                  <DeleteButton onClick={() => handleDelete(workout.id)}>Удалить</DeleteButton>
                </ButtonContainer>
              </WorkoutCard>
            ))
          ) : (
            <p>Тренировки не найдены</p>
          )}
        </WorkoutsContainer>
        {editingWorkout && (
          <Modal>
            <ModalContent>
              <ModalTitle>Редактировать тренировку</ModalTitle>
              <form onSubmit={handleSubmit(handleSave)}>
                <ModalInput
                  {...register('workout_name', { required: 'Название тренировки обязательно' })}
                  placeholder="Название тренировки"
                />
                {errors.workout_name && <p style={{ color: 'red' }}>{errors.workout_name.message}</p>}

                <ModalInput
                  type="datetime-local"
                  {...register('workout_datetime', { required: 'Дата и время обязательны' })}
                />
                {errors.workout_datetime && (
                  <p style={{ color: 'red' }}>{errors.workout_datetime.message}</p>
                )}

                <ModalSelect
                  {...register('trainer_id', { required: 'Тренер обязателен', valueAsNumber: true })}
                >
                  <option value="" disabled>
                    Выберите тренера
                  </option>
                  {trainers.map((trainer) => (
                    <option key={trainer.id} value={trainer.id}>
                      {trainer.trainer_name}
                    </option>
                  ))}
                </ModalSelect>
                {errors.trainer_id && <p style={{ color: 'red' }}>{errors.trainer_id.message}</p>}

                <ClientListModal>
                  {clients.map((client) => (
                    <ClientLabel key={client.id}>
                      <ClientCheckbox
                        type="checkbox"
                        checked={editSelectedClients.includes(client.id)}
                        onChange={() => handleClientCheckboxChange(client.id)}
                      />
                      {client.name}
                    </ClientLabel>
                  ))}
                </ClientListModal>

                <ModalButtonContainer>
                  <CancelButton type="button" onClick={() => setEditingWorkout(null)}>
                    Отмена
                  </CancelButton>
                  <SaveButton type="submit">Сохранить</SaveButton>
                </ModalButtonContainer>
              </form>
            </ModalContent>
          </Modal>
        )}
      </Wrapper>
    </>
  );
};

export default WorkoutsList;