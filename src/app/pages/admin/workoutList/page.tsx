'use client';
import Header from '@/app/components/header/Header';
import Link from 'next/link';
import { Title } from '../mainPage/MainStyles';
import { Wrapper } from '@/app/GlobalStyles';
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {ButtonContainer,CancelButton,ClientCheckbox,ClientItem,ClientLabel,ClientList,ClientListModal,DateFilterInput,DeleteButton,EditButton,Modal,ModalButtonContainer,ModalContent,ModalInput,ModalSelect,ModalTitle,SaveButton,WorkoutCard,WorkoutInfo,WorkoutsContainer,WorkoutTitle,} from './styles';
import { BackLink } from '../addClient/styles';
import { withAuth } from '@/app/withAuth';

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
  const [error, setError] = useState<string | null>(null);

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
      try {

        const trainersClientsResponse = await fetch('/api/trainers-and-clients');
        const trainersClientsData = await trainersClientsResponse.json();
        if (!trainersClientsResponse.ok) {
          throw new Error(trainersClientsData.error || 'Ошибка при загрузке тренеров и клиентов');
        }
        setTrainers(trainersClientsData.trainers || []);
        setClients(trainersClientsData.clients || []);

        const workoutsResponse = await fetch('/api/workout');
        const workoutsData = await workoutsResponse.json();
        if (!workoutsResponse.ok) {
          throw new Error(workoutsData.error || 'Ошибка при загрузке тренировок');
        }

        const formattedWorkouts: Workout[] = workoutsData.map((workout: any) => {
          const trainer = trainersClientsData.trainers?.find((t: Trainer) => t.id === workout.trainer_id);
          const formattedTrainer = trainer
            ? { id: trainer.id, trainer_name: trainer.trainer_name }
            : { id: workout.trainer_id, trainer_name: `Тренер не найден (ID: ${workout.trainer_id})` };

          const formattedClients = workout.workout_clients.map((wc: any) => {
            const client = trainersClientsData.clients?.find((c: Client) => c.id === wc.client_id);
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
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        setError(`Ошибка загрузки данных: ${(error as Error).message}`);
      }
    };

    fetchData();
  }, []);

  const filteredWorkouts = selectedDate
    ? workouts.filter((workout) => {
        const localDate = new Date(workout.workout_datetime).toLocaleDateString('sv-SE');
        return localDate === selectedDate;
      })
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
      const response = await fetch(`/api/workout/${editingWorkout.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workout_name: data.workout_name,
          workout_datetime: data.workout_datetime,
          trainer_id: data.trainer_id,
          clients: editSelectedClients,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Ошибка при обновлении тренировки');
      }

      const updatedWorkout: Workout = {
        id: result.workout.id,
        workout_name: result.workout.workout_name,
        workout_datetime: result.workout.workout_datetime,
        trainer_id: result.workout.trainer_id,
        trainers: trainers.find((t) => t.id === result.workout.trainer_id) || {
          id: result.workout.trainer_id,
          trainer_name: `Тренер не найден (ID: ${result.workout.trainer_id})`,
        },
        workout_clients: result.workout.workout_clients.map((wc: any) => {
          const client = clients.find((c) => c.id === wc.client_id);
          return {
            client_id: wc.client_id,
            clients: client
              ? { id: client.id, name: client.name }
              : { id: wc.client_id, name: `Клиент не найден (ID: ${wc.client_id})` },
          };
        }),
      };

      setWorkouts(workouts.map((w) => (w.id === editingWorkout.id ? updatedWorkout : w)));
      alert('Тренировка успешно обновлена!');
      setEditingWorkout(null);
      setEditSelectedClients([]);
      reset();
    } catch (error) {
      console.error('Ошибка:', error);
      alert(`Ошибка при сохранении тренировки: ${(error as Error).message}`);
    }
  };

  const handleClientCheckboxChange = (clientId: number) => {
    setEditSelectedClients((prev) =>
      prev.includes(clientId) ? prev.filter((id) => id !== clientId) : [...prev, clientId]
    );
  };

  const handleDelete = async (workoutId: number) => {
    if (!confirm('Вы уверены, что хотите удалить эту тренировку?')) return;

    try {
      const response = await fetch(`/api/workout/${workoutId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Ошибка при удалении тренировки');
      }

      setWorkouts(workouts.filter((workout) => workout.id !== workoutId));
      alert('Тренировка успешно удалена!');
    } catch (error) {
      console.error('Ошибка:', error);
      alert(`Ошибка при удалении тренировки: ${(error as Error).message}`);
    }
  };

  return (
    <>
      <Header />
      <Wrapper>
        <BackLink href="/pages/admin/mainPage">На главную</BackLink>
        <Title>Список тренировок</Title>
        {error && <p style={{ color: 'red' }}>{error}</p>}
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
                  Дата и время: {new Date(workout.workout_datetime).toLocaleString('ru-RU', {
                    timeZone: 'UTC',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
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

export default withAuth(WorkoutsList, true);