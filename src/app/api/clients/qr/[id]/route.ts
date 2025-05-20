import { NextResponse, NextRequest } from 'next/server';
import { supabase } from '../../../../lib/supabaseClient';

export async function GET(request: NextRequest, context: any) {
  try {
    const { id } = context.params;

    const { data, error } = await supabase
      .from('clients')
      .select('name, subscription, end_date')
      .eq('id', id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Клиент не найден' }, { status: 404 });
    }

    return NextResponse.json({
      name: data.name,
      subscription: data.subscription,
      end_date: data.end_date,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Ошибка при получении данных клиента: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}