import { NextResponse, NextRequest } from 'next/server';
import { supabase } from '../../lib/supabaseClient';
import bcrypt from 'bcryptjs';
export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    if (!username || !password) {
      return NextResponse.json({ error: 'Логин и пароль обязательны' }, { status: 400 });
    }
    const { data: admin, error: adminError } = await supabase
      .from('admins')
      .select('username, password')
      .eq('username', username)
      .single();

    if (admin && !adminError) {
      const isAdminPasswordCorrect = await bcrypt.compare(password, admin.password);
      if (isAdminPasswordCorrect) {
        return NextResponse.json({ message: 'Вход успешен', role: 'admin' }, { status: 200 });
      }
    }
    const { data: client, error: clientError } = await supabase
      .from('clients')
      .select('name, password')
      .eq('name', username)
      .single();

    if (client && !clientError) {
      const isClientPasswordCorrect = await bcrypt.compare(password, client.password);
      if (isClientPasswordCorrect) {
        return NextResponse.json({ message: 'Вход успешен', role: 'client' }, { status: 200 });
      } else {
        return NextResponse.json({ error: 'Неверный пароль' }, { status: 401 });
      }
    }
    return NextResponse.json({ error: 'Пользователь не найден' }, { status: 404 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: `Произошла ошибка при входе: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
