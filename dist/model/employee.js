"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employees = exports.Department = exports.EmployeeDef = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const database_1 = __importDefault(require("../database"));
//This is a basic model used for validation before inserting/updating into database
class EmployeeDef {
    constructor(id, name, salary, department) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
    }
    ;
}
exports.EmployeeDef = EmployeeDef;
var Department;
(function (Department) {
    Department["HR"] = "HR";
    Department["PS"] = "PS";
})(Department = exports.Department || (exports.Department = {}));
;
//Sequelization Definition for Inserting into the database.
const seq = database_1.default;
exports.Employees = seq.define('Employee', {
    //Model Attributes
    id: { type: sequelize_typescript_1.DataType.NUMBER, primaryKey: true, allowNull: false },
    name: { type: sequelize_typescript_1.DataType.STRING, allowNull: false },
    salary: { type: sequelize_typescript_1.DataType.NUMBER, allowNull: false },
    department: { type: sequelize_typescript_1.DataType.STRING, allowNull: false }
}, { tableName: 'employees', timestamps: false });
