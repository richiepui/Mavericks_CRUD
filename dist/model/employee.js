"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Department = exports.EmployeeDef = void 0;
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
