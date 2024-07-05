const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = {
  development: {
    dialect: 'sqlite',
    storage: './database.sqlite'
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:'
  },
  production: {
    dialect: 'sqlite',
    storage: './database.sqlite'
  }
}[env];

const sequelize = new Sequelize(config);

module.exports = sequelize;




