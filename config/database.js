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
    // Verifica que todas las variables de entorno estén presentes
    const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;
    if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_PORT) {
        throw new Error('Faltan variables de entorno para la conexión a la base de datos');
    }

    // Usar las credenciales locales desde credenciales.env
    sequelize = new Sequelize(
        DB_NAME,
        DB_USER,
        DB_PASSWORD,
        {
            host: DB_HOST,
            dialect: 'mysql',
            port: DB_PORT
        }
    );
}

module.exports = sequelize;
