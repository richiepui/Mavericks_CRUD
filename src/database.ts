import { Sequelize } from 'sequelize-typescript'
import {Employees} from './model/employee'

const connection = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    username:"postgres",
    password:"cf090303",
    database:"Mavericks",
    models: [Employees],
    port: 5432
})

export default connection;
