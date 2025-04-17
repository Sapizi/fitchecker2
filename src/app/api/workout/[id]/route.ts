import { NextResponse, NextRequest } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export async function PUT(request: NextRequest, context: any) {
  try {
    const { id } = context.params;
    const body = await request.json();
    const { workout_name, workout_datetime, trainer_id, clients } = body;

    if (!workout_name || !workout_datetime || !trainer_id) {
      return NextResponse.json({ error: 'Название, дата и тренер обязательны' }, { status: 400 });
    }

    if (clients && !Array.isArray(clients)) {
      return NextResponse.json({ error: 'Клиенты должны быть массивом' }, { status: 400 });
    }

    if (clients && clients.length > 30) {
      return NextResponse.json({ error: 'Можно выбрать не более 30 клиентов' }, { status: 400 });
    }

    const { error: updateError } = await supabase
      .from('workouts')
      .update({
        workout_name,
        workout_datetime,
        trainer_id,
      })
      .eq('id', id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    await supabase
      .from('workout_clients')
      .delete()
      .eq('workout_id', id);

    if (clients && clients.length > 0) {
      const workoutClients = clients.map((clientId: number) => ({
        workout_id: parseInt(id),
        client_id: clientId,
      }));

      const { error: clientsError } = await supabase
        .from('workout_clients')
        .insert(workoutClients);

      if (clientsError) {
        return NextResponse.json({ error: clientsError.message }, { status: 500 });
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
      .eq('id', id)
      .single();

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Тренировка успешно обновлена', workout: updatedWorkoutData }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Ошибка при обновлении тренировки: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: any) {
  try {
    const { id } = context.params;

    const { error: deleteError } = await supabase
      .from('workouts')
      .delete()
      .eq('id', id);

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Тренировка успешно удалена' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Ошибка при удалении тренировки: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}