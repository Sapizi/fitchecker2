import { NextResponse, NextRequest } from 'next/server';
import { supabase } from '../../lib/supabaseClient';

export async function GET() {
  try {
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
      return NextResponse.json({ error: workoutsError.message }, { status: 500 });
    }

    return NextResponse.json(workoutsData || [], { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Ошибка при загрузке тренировок: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { workoutName, workoutDateTime, trainerId, clients } = body;

    if (!workoutName || !workoutDateTime || !trainerId) {
      return NextResponse.json({ error: 'Название, дата и тренер обязательны' }, { status: 400 });
    }

    if (clients && !Array.isArray(clients)) {
      return NextResponse.json({ error: 'Клиенты должны быть массивом' }, { status: 400 });
    }

    if (clients && clients.length > 30) {
      return NextResponse.json({ error: 'Можно выбрать не более 30 клиентов' }, { status: 400 });
    }

    const { data: workoutData, error: workoutError } = await supabase
      .from('workouts')
      .insert({
        workout_name: workoutName,
        workout_datetime: workoutDateTime,
        trainer_id: trainerId
      })
      .select()
      .single();

    if (workoutError) {
      return NextResponse.json({ error: workoutError.message }, { status: 500 });
    }

    if (clients && clients.length > 0 && workoutData) {
      const workoutClients = clients.map((clientId: number) => ({
        workout_id: workoutData.id,
        client_id: clientId
      }));

      const { error: clientsError } = await supabase
        .from('workout_clients')
        .insert(workoutClients);

      if (clientsError) {
        return NextResponse.json({ error: clientsError.message }, { status: 500 });
      }
    }

    return NextResponse.json({ message: 'Тренировка успешно добавлена', workout: workoutData }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: `Ошибка при добавлении тренировки: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}