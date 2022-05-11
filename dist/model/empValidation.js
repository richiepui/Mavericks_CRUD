"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const employee_1 = require("../model/employee");
const Joi = require('joi');
const dept = employee_1.Department;
const employeeSchema = Joi.object({
    name: Joi.string().min(2).strict().trim().required(),
    salary: Joi.number().strict().integer().min(0).required(),
    department: Joi.string().valid(dept.HR, dept.PS).required()
});
module.exports = {
    employeeSchema
};
