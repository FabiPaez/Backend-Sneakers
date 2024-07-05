const { Sequelize } = require('sequelize');

// Datos de conexión de JawsDB
const database = 'mp84y4tzz6dxpj2l';
const username = 'r2x4kbd8hvya2vw1';
const password = 'k7pfqbukmx897f4z';
const host = 'h2cwrn74535xdazj.cbetxkdyhwsb.us-east-1.rds.amazonaws.com';
const port = '3306';

const sequelize = new Sequelize(database, username, password, {
  host: host,
  port: port,
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false // Si no quieres ver las consultas SQL en la consola
});

module.exports = sequelize;

