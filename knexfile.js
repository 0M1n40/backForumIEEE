require('dotenv').config(); // Carrega o .env automaticamente

module.exports = {
  client: 'mysql2',
  connection: {
    host: process.env.SERVER_HOST,        // ex: localhost
    port: process.env.SERVER_DB_PORT,     // ex: 3306
    user: process.env.SERVER_USER,        // ex: root
    password: process.env.SERVER_PASSWORD,// ex: 123456
    database: process.env.SERVER_DB       // ex: projeto
  },
  migrations: {
    tablename: 'migrations',
    directory: `${__dirname}/src/database/migrations`
  }
};
