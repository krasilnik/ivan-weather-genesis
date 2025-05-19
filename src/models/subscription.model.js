const { DataTypes } = require('sequelize');
const { sequelize } = require('.');

module.exports = (sequelize) => 
    sequelize.define ('Subscription', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {isEmail: true},
            unique: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        frequency: {
            type: DataTypes.ENUM('hourly', 'daily'),
            allowNull: false,
        },
        confirmed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    });