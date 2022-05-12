"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const connection = new sequelize_typescript_1.Sequelize({
    dialect: "postgres",
    host: "localhost",
    username: "postgres",
    password: "cf090303",
    database: "Mavericks",
    port: 5432
});
exports.default = connection;
