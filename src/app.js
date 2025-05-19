const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const weatherRoutes = require('./routes/weather.routes');
const subscriptionRoutes = require('./routes/subscription.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Віддаємо HTML сторінку з public/
app.use(express.static(path.join(__dirname, '../public')));

// API маршрути 
app.use('/api', weatherRoutes);
app.use('/api', subscriptionRoutes);

module.exports = app;