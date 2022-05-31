import {Department} from './employeeModel'

const Joi = require('joi');

const dept = Department

const employeeSchema =  Joi.object({
    name: Joi.string().min(2).strict().trim().required(),
    salary: Joi.number().integer().min(0).required(),
    department: Joi.string().valid(dept.HR,dept.PS).required()
});

export default employeeSchema