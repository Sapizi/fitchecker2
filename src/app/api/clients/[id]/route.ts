import { NextResponse, NextRequest } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export async function PUT(request: NextRequest, context: any) {
  try {
    const { id } = context.params;
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

    const { error } = await supabase
      .from('clients')
      .update({ name, sex, age: parsedAge, subscription })
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Клиент успешно обновлен' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Ошибка при обновлении клиента: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: any) {
  try {
    const { id } = context.params;

    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Клиент успешно удален' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Ошибка при удалении клиента: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}