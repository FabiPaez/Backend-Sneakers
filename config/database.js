const { Sequelize } = require('sequelize');
const url = require('url');

let sequelize;

if (process.env.DATABASE_URL) {
  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth ? params.auth.split(':') : [null, null];

  sequelize = new Sequelize(params.pathname ? params.pathname.substring(1) : null, auth[0], auth[1], {
    host: params.hostname,
    port: params.port,
    dialect: params.protocol ? params.protocol.replace(':', '') : null,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
    }
  );
}

module.exports = sequelize;
