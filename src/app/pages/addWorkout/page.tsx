'use client';
import Header from "@/app/components/header/Header";
import Link from "next/link";
import { AddForm, AddInput, FormContainer, AddButton, TrainerSelect, ClientList, ClientListTitle, ClientLabel, ClientCheckbox } from "./AddWorkout";
import { Title } from "../mainPage/MainStyles";
import { Wrapper } from "@/app/GlobalStyles";
import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supbase"; // Исправленный импорт

interface Trainer {
  id: number;
  trainer_name: string;
}

interface Client {
  id: number;
  name: string;
}

const AddWorkout = () => {
  const [workoutName, setWorkoutName] = useState("");
  const [workoutDateTime, setWorkoutDateTime] = useState("");
  const [selectedTrainer, setSelectedTrainer] = useState<number | null>(null);
  const [selectedClients, setSelectedClients] = useState<number[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTrainersAndClients = async () => {
      const { data: trainersData, error: trainersError } = await supabase
        .from("trainers")
        .select("id, trainer_name");
      if (trainersError) {
        console.error("Ошибка загрузки тренеров:", trainersError);
      } else {
        console.log("Данные тренеров из Supabase:", trainersData);
        setTrainers(trainersData || []);
      }
      const { data: clientsData, error: clientsError } = await supabase
        .from("clients")
        .select("id, name");
      if (clientsError) {
        console.error("Ошибка загрузки клиентов:", clientsError);
      } else {
        console.log("Данные клиентов из Supabase:", clientsData);
        setClients(clientsData || []);
      }
    };
    fetchTrainersAndClients();
  }, []);

  useEffect(() => {
    console.log("Текущее состояние trainers:", trainers);
  }, [trainers]);

  const handleClientCheckboxChange = (clientId: number) => {
    setSelectedClients((prev) =>
      prev.includes(clientId)
        ? prev.filter((id) => id !== clientId)
        : [...prev, clientId]
    );
  };

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workoutName || !workoutDateTime || !selectedTrainer) {
      alert("Пожалуйста, заполните все обязательные поля!");
      return;
    }
    const { data: workoutData, error: workoutError } = await supabase
      .from("workouts")
      .insert({
        workout_name: workoutName,
        workout_datetime: workoutDateTime,
        trainer_id: selectedTrainer,
      })
      .select()
      .single();
    if (workoutError) {
      console.error("Ошибка добавления тренировки:", workoutError);
      alert("Ошибка при добавлении тренировки!");
      return;
    }
    if (selectedClients.length > 0 && workoutData) {
      const workoutClients = selectedClients.map((clientId) => ({
        workout_id: workoutData.id,
        client_id: clientId,
      }));

      const { error: clientsError } = await supabase
        .from("workout_clients")
        .insert(workoutClients);

      if (clientsError) {
        console.error("Ошибка добавления клиентов:", clientsError);
        alert("Тренировка добавлена, но произошла ошибка при добавлении клиентов!");
        return;
      }
    }
    alert("Тренировка успешно добавлена!");
    setWorkoutName("");
    setWorkoutDateTime("");
    setSelectedTrainer(null);
    setSelectedClients([]);
    setSearchQuery("");
  };

  return (
    <>
      <Header />
      <Wrapper>
        <Link href="/pages/mainPage">На главную</Link>
        <Title>Добавить занятие</Title>
        <FormContainer>
          <AddForm onSubmit={handleSubmit}>
            <AddInput
              type="text"
              placeholder="Название занятия"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
            />
            <AddInput
              type="datetime-local"
              placeholder="Дата и время"
              value={workoutDateTime}
              onChange={(e) => setWorkoutDateTime(e.target.value)}
            />
            <TrainerSelect
              value={selectedTrainer || ""}
              onChange={(e) => setSelectedTrainer(Number(e.target.value))}
            >
              <option value="" disabled>
                Выберите тренера
              </option>
              {trainers.length > 0 ? (
                trainers.map((trainer) => (
                  <option key={trainer.id} value={trainer.id}>
                    {trainer.trainer_name}
                  </option>
                ))
              ) : (
                <option disabled>Тренеры не найдены</option>
              )}
            </TrainerSelect>
            <AddInput
              type="text"
              placeholder="Поиск клиентов по ФИО"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <ClientList>
              <ClientListTitle>Выберите клиентов:</ClientListTitle>
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <ClientLabel key={client.id}>
                    <ClientCheckbox
                      type="checkbox"
                      checked={selectedClients.includes(client.id)}
                      onChange={() => handleClientCheckboxChange(client.id)}
                    />
                    {client.name}
                  </ClientLabel>
                ))
              ) : (
                <p>Клиенты не найдены</p>
              )}
            </ClientList>
            <AddButton type="submit">Добавить тренировку</AddButton>
          </AddForm>
        </FormContainer>
      </Wrapper>
    </>
  );
};

export default AddWorkout;