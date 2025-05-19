const nodemailer = require('nodemailer');
exports.sendConfirmationEmail = async (email, token, city) => {
    const trasporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const confirmUrl = `${process.env.API_URL}/api/confirm/${token}`;

    await trasporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: `Підтвердження підписки на погоду у місті ${city}`,
        html: `<p>Натисни <a href="${confirmUrl}">тут</a>, щоб підтвердити підписку.</p>`,
    });
};

exports.sendWeatherEmail = async (email, city, weather, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  

  const { temperature, humidity, description } = weather;
  const unsubscribeLink = `${process.env.API_URL}/api/unsubscribe/${token}`;

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: `🌤 Погода в ${city}`,
    html: `
      <h2>Прогноз погоди</h2>
      <p>🌡 Температура: ${temperature}°C</p>
      <p>💧 Вологість: ${humidity}%</p>
      <p>☁️ Опис: ${description}</p>
      <hr>
      <p style="font-size: 12px; color: gray;">
        Більше не хочете отримувати ці листи? 
        <a href="${unsubscribeLink}">Відписатися</a>
      </p>
    `,
  });
};
