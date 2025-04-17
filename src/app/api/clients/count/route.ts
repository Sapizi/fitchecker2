import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export async function GET() {
  try {
    const { count, error } = await supabase
      .from('clients')
      .select('*', { count: 'exact' });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ count: count ?? 0 }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Ошибка при загрузке количества клиентов: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}