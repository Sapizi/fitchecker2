import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail', // или другой почтовик, если нужно
  auth: {
    user: process.env.EMAIL_USER,    
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendClientWelcomeEmail(to: string, name: string, password: string) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: 'Добро пожаловать в фитнес-клуб!',
    html: `
      <h2>Здравствуйте, ${name}!</h2>
      <p>Вы были добавлены в систему фитнес-клуба.</p>
      <p><strong>Ваш пароль:</strong> ${password}</p>
    `,
  });
}
