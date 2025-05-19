const app = require('./src/app')
const { sequelize } = require('./src/models');

const PORT = process.env.PORT || 3000;

// Підключення до БД і запуск сервера

sequelize.sync().then(() => {
    console.log('DB connected successfully');
    app.listen(PORT, () => {
        console.log(`Service is running on port ${PORT}`);
    });
});

require('./src/jobs/weather.job');
