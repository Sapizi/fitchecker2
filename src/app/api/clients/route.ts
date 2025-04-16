import { NextResponse, NextRequest } from 'next/server';
import { supabase } from '../../lib/supabaseClient';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, sex, age, subscription } = body;

    if (!name || !sex || !age || !subscription) {
      return NextResponse.json({ error: 'Все поля обязательны' }, { status: 400 });
    }

    const parsedAge = parseInt(String(age), 10);
    if (isNaN(parsedAge) || parsedAge <= 0) {
      return NextResponse.json({ error: 'Возраст должен быть положительным числом' }, { status: 400 });
    }

    if (!['male', 'female'].includes(sex)) {
      return NextResponse.json({ error: 'Недопустимое значение для пола' }, { status: 400 });
    }

    if (!['monthly', 'quarterly', 'yearly'].includes(subscription)) {
      return NextResponse.json({ error: 'Недопустимое значение для абонемента' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('clients')
      .insert([{ name, sex, age: parsedAge, subscription }])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Клиент успешно добавлен', client: data[0] }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: `Ошибка при добавлении клиента: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}