"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.getEmployees = exports.getEmployeeById = exports.createEmployees = void 0;
const employee_1 = require("../model/employee");
const { employeeSchema } = require('../model/empValidation');
const createEmployees = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { error } = employeeSchema.validate(body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
    }
    else {
        const name = req.body.name;
        const salary = req.body.salary;
        const department = req.body.department;
        var id = yield employee_1.Employees.count();
        const query = yield employee_1.Employees.findByPk(id);
        if (query) {
            id = Math.floor(Math.random() * 1000);
        }
        const result = yield employee_1.Employees.create({ id: id, name: name, salary: salary, department: department });
        console.log(result);
        res.status(200).json({ message: "Employeed Created Successfully", employeeCreated: result });
    }
});
exports.createEmployees = createEmployees;
const getEmployeeById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const inputEmpId = +req.params.id;
    const query = yield employee_1.Employees.findByPk(inputEmpId);
    if (!query) {
        res.status(404).json({ message: "Employee could not be found" });
    }
    else {
        res.status(200).json({ message: "Employee Found", employee: query });
    }
});
exports.getEmployeeById = getEmployeeById;
const getEmployees = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = yield employee_1.Employees.findAll();
    res.status(200).json(query);
});
exports.getEmployees = getEmployees;
const updateEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { error } = employeeSchema.validate(body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
    }
    else {
        const inputEmpId = +req.params.id;
        const upName = req.body.name;
        const upSalary = req.body.salary;
        const upDepartment = req.body.department;
        const query = yield employee_1.Employees.findByPk(inputEmpId);
        if (!query) {
            res.status(404).json({ message: 'Employee could not be found' });
        }
        else {
            const ret = query.toJSON();
            console.log(ret);
            if (upName == ret.name && upSalary == ret.salary && upDepartment == ret.department) {
                res.status(304).json({ message: "No Change has been made" });
            }
            else {
                employee_1.Employees.update({ name: upName, salary: upSalary, department: upDepartment }, { where: { id: inputEmpId } });
                const newDetails = new employee_1.EmployeeDef(inputEmpId, upName, upSalary, upDepartment);
                res.status(200).json({ message: "Employee Details Updated", newEmpDetails: newDetails });
            }
        }
    }
});
exports.updateEmployee = updateEmployee;
const deleteEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const inputEmpId = +req.params.id;
    const query = yield employee_1.Employees.findByPk(inputEmpId);
    if (!query) {
        res.status(404).json({ message: "Employee could not be found" });
    }
    else {
        yield employee_1.Employees.destroy({ where: { id: inputEmpId } });
        res.status(200).json({ message: "Employee is deleted", deleted: query });
    }
});
exports.deleteEmployee = deleteEmployee;
