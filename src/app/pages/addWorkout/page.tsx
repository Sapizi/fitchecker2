'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Header from "@/app/components/header/Header";
import Link from "next/link";
import { AddForm, AddInput, FormContainer, AddButton, TrainerSelect, ClientList, ClientListTitle, ClientLabel, ClientCheckbox } from "./AddWorkout";
import { Title } from "../mainPage/MainStyles";
import { Wrapper } from "@/app/GlobalStyles";
import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";

const workoutSchema = z.object({
  workoutName: z.string().min(1, "Название обязательно"),
  workoutDateTime: z.string().min(1, "Дата и время обязательны"),
  trainerId: z.number().min(1, "Выберите тренера"),
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
        const [
          { data: trainersData, error: trainersError },
          { data: clientsData, error: clientsError }
        ] = await Promise.all([
          supabase.from("trainers").select("id, trainer_name"),
          supabase.from("clients").select("id, name")
        ]);

        if (trainersError) throw trainersError;
        if (clientsError) throw clientsError;

        setTrainers(trainersData || []);
        setClients(clientsData || []);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
        setErrorMessage("Ошибка загрузки данных. Пожалуйста, обновите страницу.");
      }
    };

    fetchTrainersAndClients();
  }, []);

  const handleClientCheckboxChange = (clientId: number) => {
    const currentClients = formValues.clients || [];
  
    if (currentClients.includes(clientId)) {
      const newClients = currentClients.filter(id => id !== clientId);
      setValue("clients", newClients);
    } else {
      if (currentClients.length >= 30) {
        alert("Можно выбрать не более 30 клиентов.");
        return;
      }
      const newClients = [...currentClients, clientId];
      setValue("clients", newClients);
    }
  };
  

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes((formValues.searchQuery || "").toLowerCase())
  );

  const onSubmit = async (data: WorkoutFormData) => {
    try {
      const { data: workoutData, error: workoutError } = await supabase
        .from("workouts")
        .insert({
          workout_name: data.workoutName,
          workout_datetime: data.workoutDateTime,
          trainer_id: data.trainerId,
        })
        .select()
        .single();

      if (workoutError) throw workoutError;


      if (data.clients && data.clients.length > 0 && workoutData) {
        const workoutClients = data.clients.map(clientId => ({
          workout_id: workoutData.id,
          client_id: clientId,
        }));

        const { error: clientsError } = await supabase
          .from("workout_clients")
          .insert(workoutClients);

        if (clientsError) throw clientsError;
      }

      setSuccessMessage("Тренировка успешно добавлена!");
      reset();
      setErrorMessage(null);
    } catch (error) {
      console.error("Ошибка при добавлении тренировки:", error);
      setErrorMessage("Произошла ошибка при добавлении тренировки. Пожалуйста, попробуйте снова.");
      setSuccessMessage(null);
    }
  };

  return (
    <>
      <Header />
      <Wrapper>
        <Link href="/pages/mainPage">На главную</Link>
        <Title>Добавить занятие</Title>
        
        <FormContainer>
          <AddForm onSubmit={handleSubmit(onSubmit)}>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}

            <AddInput
              type="text"
              placeholder="Название занятия"
              {...register("workoutName")}
              aria-invalid={errors.workoutName ? "true" : "false"}
            />
            {errors.workoutName && <span style={{ color: 'red' }}>{errors.workoutName.message}</span>}

            <AddInput
              type="datetime-local"
              placeholder="Дата и время"
              {...register("workoutDateTime")}
              aria-invalid={errors.workoutDateTime ? "true" : "false"}
            />
            {errors.workoutDateTime && <span style={{ color: 'red' }}>{errors.workoutDateTime.message}</span>}

            <TrainerSelect
              {...register("trainerId", { valueAsNumber: true })}
              aria-invalid={errors.trainerId ? "true" : "false"}
            >
              <option value="">Выберите тренера</option>
              {trainers.map((trainer) => (
                <option key={trainer.id} value={trainer.id}>
                  {trainer.trainer_name}
                </option>
              ))}
            </TrainerSelect>
            {errors.trainerId && <span style={{ color: 'red' }}>{errors.trainerId.message}</span>}

            <AddInput
              type="text"
              placeholder="Поиск клиентов по ФИО"
              {...register("searchQuery")}
            />

            <ClientList>
              <ClientListTitle>Выберите клиентов: (максимум 30)</ClientListTitle>
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <ClientLabel key={client.id}>
                    <ClientCheckbox
                      type="checkbox"
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

            <AddButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Добавление..." : "Добавить тренировку"}
            </AddButton>
          </AddForm>
        </FormContainer>
      </Wrapper>
    </>
  );
};

export default AddWorkout;