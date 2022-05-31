import { Sequelize } from 'sequelize-typescript'
import { Employees } from './employee/employeeModel';
import { Users } from './user/userModel';

const connection = new Sequelize({
    dialect: "postgres",
    host: "db",
    username:"postgres",
    password:"postgres",
    database:"postgres",
    port: 5432,
    models: [Users,Employees]
})

export default connection;
