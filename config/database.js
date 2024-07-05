const { Sequelize } = require('sequelize');
require('dotenv').config({ path: '../credenciales.env' });

let sequelize;

if (process.env.DATABASE_URL) {
    // Usar la URL de conexión proporcionada por Heroku (JawsDB)
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'mysql',
        protocol: 'mysql',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });
} else {
    // Usar las credenciales locales desde credenciales.env
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD || null,
        {
            host: process.env.DB_HOST,
            dialect: 'mysql',
            port: process.env.DB_PORT
        }
    );
}

module.exports = sequelize;

