import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export async function GET() {
  try {
    const now = new Date();
    const startOfDay = new Date(now.setUTCHours(0, 0, 0, 0));
    const endOfDay = new Date(now.setUTCHours(23, 59, 59, 999));

    const { data: workouts, error } = await supabase
      .from('workouts')
      .select('id, workout_name, workout_datetime, trainers(trainer_name)')
      .gte('workout_datetime', startOfDay.toISOString())
      .lte('workout_datetime', endOfDay.toISOString())
      .order('workout_datetime', { ascending: true })
      .limit(5);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(workouts || [], { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Ошибка при загрузке занятий: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
//©sapizi