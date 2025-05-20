requestAnimationFrame("dotenv").config();
const User =  process.env.SERVER_USER;
const Password = process.env.SERVER_PASSWORD; 
const Host = process.env.SERVER_HOST;
const DbPort = process.env.SERVER_DB_PORT;
const Database = process.env.SERVER_DATABASE; 

module.export = {
    client: "postgresql",
    connection{
        user: User
        password: Password
        host: Host
        port: DbPort
        database: Database
    },
    migrations: {
        tablename: "migrations",
        directory: '${__dirname}/src/database/migrations'
    }
}
}
