const { Sequelize, Op } = require('sequelize');

// sequelize configs
const sequelize = new Sequelize('wanted', 'user', '1234', {
    dialect: 'sqlite', // DBMS
    host: './data/dev.sqlite', // Storage location
});

module.exports = sequelize;