import { NextResponse } from 'next/server';
import { supabase } from '../../lib/supabaseClient';

export async function GET() {
  try {
    const [
      { data: trainersData, error: trainersError },
      { data: clientsData, error: clientsError }
    ] = await Promise.all([
      supabase.from('trainers').select('id, trainer_name'),
      supabase.from('clients').select('id, name')
    ]);

    if (trainersError) {
      return NextResponse.json({ error: trainersError.message }, { status: 500 });
    }
    if (clientsError) {
      return NextResponse.json({ error: clientsError.message }, { status: 500 });
    }

    return NextResponse.json(
      {
        trainers: trainersData || [],
        clients: clientsData || []
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Ошибка при загрузке данных: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
//©sapizi