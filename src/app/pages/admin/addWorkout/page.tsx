'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Header from '@/app/components/header/Header';
import { AddForm, AddInput, FormContainer, AddButton, TrainerSelect, ClientList, ClientListTitle, ClientLabel, ClientCheckbox } from './AddWorkout';
import { Title } from '../mainPage/MainStyles';
import { Wrapper } from '@/app/GlobalStyles';
import { useEffect, useState } from 'react';
import { BackLink } from '../addClient/styles';
import { withAuth } from '@/app/withAuth';

const workoutSchema = z.object({
  workoutName: z.string().min(1, 'Название обязательно'),
  workoutDateTime: z.string().min(1, 'Дата и время обязательны'),
  trainerId: z.number().min(1, 'Выберите тренера'),
  searchQuery: z.string().optional(),
  clients: z.array(z.number()).optional()
});

type WorkoutFormData = z.infer<typeof workoutSchema>;

interface Trainer {
  id: number;
  trainer_name: string;
}

interface Client {
  id: number;
  name: string;
}

const AddWorkout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset
  } = useForm<WorkoutFormData>({
    resolver: zodResolver(workoutSchema),
    defaultValues: {
      clients: []
    }
  });

  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const formValues = watch();

  useEffect(() => {
    const fetchTrainersAndClients = async () => {
      try {
        const response = await fetch('/api/trainers-and-clients');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Ошибка при загрузке данных');
        }

        setTrainers(data.trainers);
        setClients(data.clients);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        setErrorMessage('Ошибка загрузки данных. Пожалуйста, обновите страницу.');
      }
    };

    fetchTrainersAndClients();
  }, []);

  const handleClientCheckboxChange = (clientId: number) => {
    const currentClients = formValues.clients || [];

    if (currentClients.includes(clientId)) {
      const newClients = currentClients.filter(id => id !== clientId);
      setValue('clients', newClients);
    } else {
      if (currentClients.length >= 30) {
        alert('Можно выбрать не более 30 клиентов.');
        return;
      }
      const newClients = [...currentClients, clientId];
      setValue('clients', newClients);
    }
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes((formValues.searchQuery || '').toLowerCase())
  );

  const onSubmit = async (data: WorkoutFormData) => {
    try {
      const response = await fetch('/api/workout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Ошибка при добавлении тренировки');
      }

      setSuccessMessage('Тренировка успешно добавлена!');
      reset();
      setErrorMessage(null);
    } catch (error) {
      console.error('Ошибка при добавлении тренировки:', error);
      setErrorMessage('Произошла ошибка при добавлении тренировки. Пожалуйста, попробуйте снова.');
      setSuccessMessage(null);
    }
  };

  return (
    <>
      <Header />
      <Wrapper>
        <BackLink href='/pages/admin/mainPage'>На главную</BackLink>
        <Title>Добавить тренировку</Title>
        
        <FormContainer>
          <AddForm onSubmit={handleSubmit(onSubmit)}>
            

            <AddInput
              type='text'
              placeholder='Название занятия'
              {...register('workoutName')}
              aria-invalid={errors.workoutName ? 'true' : 'false'}
            />
            {errors.workoutName && <span style={{ color: 'red' }}>{errors.workoutName.message}</span>}

            <AddInput
              type='datetime-local'
              placeholder='Дата и время'
              {...register('workoutDateTime')}
              aria-invalid={errors.workoutDateTime ? 'true' : 'false'}
            />
            {errors.workoutDateTime && <span style={{ color: 'red' }}>{errors.workoutDateTime.message}</span>}

            <TrainerSelect
              {...register('trainerId', { valueAsNumber: true })}
              aria-invalid={errors.trainerId ? 'true' : 'false'}
            >
              <option value=''>Выберите тренера</option>
              {trainers.map((trainer) => (
                <option key={trainer.id} value={trainer.id}>
                  {trainer.trainer_name}
                  </option>
              ))}
            </TrainerSelect>
            {errors.trainerId && <span style={{ color: 'red' }}>{errors.trainerId.message}</span>}

            <AddInput
              type='text'
              placeholder='Поиск клиентов по ФИО'
              {...register('searchQuery')}
            />

            <ClientList>
              <ClientListTitle>Выберите клиентов: (максимум 30)</ClientListTitle>
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <ClientLabel key={client.id}>
                    <ClientCheckbox
                      type='checkbox'
                      checked={(formValues.clients || []).includes(client.id)}
                      onChange={() => handleClientCheckboxChange(client.id)}
                    />
                    {client.name}
                  </ClientLabel>
                ))
              ) : (
                <p>Клиенты не найдены</p>
              )}
            </ClientList>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
            <AddButton type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Добавление...' : 'Добавить тренировку'}
            </AddButton>
          </AddForm>
        </FormContainer>
      </Wrapper>
    </>
  );
};

export default withAuth(AddWorkout, true);