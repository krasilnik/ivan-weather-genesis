const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

const Subscription = require('./subscription.model')(sequelize);

// Не експортуй весь обʼєкт
module.exports = { sequelize, Subscription };