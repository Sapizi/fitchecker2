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

    if (adminError || !admin) {
      return NextResponse.json({ error: 'Пользователь не найден' }, { status: 404 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ error: 'Неверный пароль' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Вход успешен', role: 'admin' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Произошла ошибка при входе: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}