# Weather Forecast Subscription API

Повноцінний сервіс підписки на оновлення погоди з REST API, HTML-формою, email-підтвердженням, cron-розсилкою та продакшн-деплоєм через Docker на Render.

---

## Функціонал

* Підписка користувача на оновлення погоди для обраного міста
* Частота: щогодини або щодня
* Email-підтвердження підписки
* Cron-розсилка оновлень погоди
* HTML-форма для користувача
* REST API згідно Swagger-документації
* Деплой на Render (Node.js + Docker + PostgreSQL)
* Dockerfile + Docker Compose
* Тести (Jest + Supertest)

---

## Архiтектура проєкту

project/
├── public/                 # HTML-інтерфейс (форма)
│   └── index.html
├── src/
│   ├── app.js             # Ініціалізація Express
│   ├── server.js          # Запуск сервісу
│   ├── routes/            # Маршрути API
│   ├── controllers/       # Обробка запитів
│   ├── services/          # Email, погода, підтвердження
│   ├── models/            # Sequelize моделі
│   ├── jobs/              # Cron-задачі
│   └── utils/             # Генерація токенів, шаблони email
├── tests/                 # Тестування (Jest + Supertest)
├── Dockerfile             # Інструкція для продакшн-контейнера
├── docker-compose.yml     # Локальний запуск сервісу + БД
├── .gitignore             # Ігнорування секретних/зайвих файлів
├── .env.example           # Приклад .env без секретів
└── README.md              # Цей файл

---

## Технології та бібліотеки

* **Node.js / Express** — бекенд фреймворк
* **Sequelize** — ORM для PostgreSQL
* **Nodemailer** — відправка email
* **node-cron** — періодична email-розсилка
* **dotenv** — змінні середовища
* **axios** — API-запити до WeatherAPI
* **Jest / Supertest** — тести
* **Docker / Docker Compose** — контейнеризація
* **Render.com** — хостинг API + бази даних

---

## Як запускати локально (з Docker Compose)

1. Створити `.env` файл зі своїми значеннями для змінних

```env
PORT=3000
DATABASE_URL=postgres://user:pass@host:5432/db
WEATHER_API_KEY=...
SMTP_USER=youremail@example.com
SMTP_PASS=yourpassword
API_URL=https://your-app.onrender.com
```
2. Запусти:

```bash
docker-compose up --build
```

3. Відкрити `http://localhost:3000/` — html сторінка
4. API доступне за посиланням `http://localhost:3000/api/...`

---

## Тестування

```bash
docker-compose run --rm app npm test
```

або

```bash
npm run test
```

---

## Деплой на Render

Щоб відкрити задеплоєний сервіс - перейдіть за посиланням: https://ivan-weather-genesis.onrender.com

---

## Логіка взаємодії

1. Користувач заповнює HTML-форму → `POST /api/subscribe`
2. API генерує токен, зберігає підписку, надсилає email
3. Користувач клікає на посилання → `GET /api/confirm/:token`
4. Після підтвердження — запис оновлюється
5. Cron щохвилини/щодня перевіряє підтверджених користувачів
6. Надсилає їм email з поточною погодою через WeatherAPI
7. Користувач може відписатися → `GET /api/unsubscribe/:token`
