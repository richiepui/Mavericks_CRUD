import { Sequelize } from 'sequelize-typescript'

const connection = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    username:"postgres",
    password:"cf090303",
    database:"Mavericks",
    port: 5432
})

export default connection;
