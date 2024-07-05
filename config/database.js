const { Sequelize } = require('sequelize');
const url = require('url');

let sequelize;

if (process.env.DATABASE_URL) {
  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth ? params.auth.split(':') : [null, null];
  const protocol = params.protocol ? params.protocol.replace(':', '') : null;

  if (!protocol) {
    throw new Error('Dialect needs to be explicitly supplied');
  }

  sequelize = new Sequelize(params.pathname ? params.pathname.substring(1) : null, auth[0], auth[1], {
    host: params.hostname,
    port: params.port,
    dialect: protocol,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
} else {
  if (!process.env.DB_DIALECT) {
    throw new Error('Dialect needs to be explicitly supplied');
  }

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
