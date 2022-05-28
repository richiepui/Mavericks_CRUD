import { Sequelize } from 'sequelize-typescript'

const connection = new Sequelize({
    dialect: "postgres",
    host: "db",
    username:"postgres",
    password:"postgres",
    database:"postgres",
    port: 5432
})

export default connection;
