import { NextResponse, NextRequest } from 'next/server';
import { supabase } from '../../lib/supabaseClient';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
function generatePassword(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

async function sendClientEmail(email: string, name: string, password: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Добро пожаловать в FitChecker!',
    text: `
Здравствуйте, ${name}!

Вы были успешно зарегистрированы в нашей системе FitChecker.

Ваш логин: ${name}

Ваш временный пароль: ${password}

Пожалуйста, используйте его для входа и поменяйте пароль после первой авторизации.

С уважением, команда FitChecker.
    `.trim(),
  };

  await transporter.sendMail(mailOptions);
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Ошибка при загрузке клиентов: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, sex, age, subscription, email } = body;

    if (!name || !sex || !age || !subscription || !email) {
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


    const plainPassword = generatePassword();

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const currentDate = new Date();
    let endDate;

    switch (subscription) {
      case 'monthly':
        endDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
        break;
      case 'quarterly':
        endDate = new Date(currentDate.setMonth(currentDate.getMonth() + 3));
        break;
      case 'yearly':
        endDate = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));
        break;
      default:
        return NextResponse.json({ error: 'Неизвестный тип абонемента' }, { status: 400 });
    }

    const formattedEndDate = endDate.toISOString();

 
    const { data, error } = await supabase
      .from('clients')
      .insert([
        {
          name,
          sex,
          age: parsedAge,
          subscription,
          email,
          password: hashedPassword,
          end_date: formattedEndDate, 
        },
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await sendClientEmail(email, name, plainPassword);

    return NextResponse.json({ message: 'Клиент успешно добавлен', client: data[0] }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: `Ошибка при добавлении клиента: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}