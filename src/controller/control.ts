import {RequestHandler, response} from 'express';
import {EmployeeDef, Department} from '../model/employee'
const {employeeSchema} = require('../model/empValidation')
import {pool} from '../database'


const Emp: EmployeeDef[] = [];

export const createEmployees: RequestHandler = (req,res,next) => {
    const body = req.body;
    const{error} = employeeSchema.validate(body);
    if(error){
        res.status(400).json({message: error.details[0].message});
    }
    else{
        const name  = (req.body as{name:string}).name;
        const salary = (req.body as{salary:number}).salary;
        const department = (req.body as{department:Department}).department;
        var newEmployeeId = Emp.length;
        var searchid = Emp.findIndex(employee => employee.id === newEmployeeId);
        if(!(searchid < 0)){
            newEmployeeId = Math.random();
        }
        const newEmployee = new EmployeeDef(newEmployeeId, name, salary,department);
        Emp.push(newEmployee);
        res.status(200).json({message: 'Employee Created Successfully', employeeCreated: newEmployee});
    }
};

export const getEmployeeById: RequestHandler<{id:string}>= async(req,res,next)=>{
    const inputEmpId = +req.params.id;
    const response = await pool.query('SELECT * from employees where employee_id = $1', [inputEmpId]);
    if(!response.rows.length){  
        res.status(404).json({message:"Employee could not be found"});
    }
    else{
        res.status(200).json({message:"Employee Found", employee: response.rows});
    }
}

export const getEmployees:  RequestHandler = async (req,res,next)=>{
    const response= await pool.query('Select * from employees');
    res.status(200).json(response.rows);
}

//This is to specify the id as type of string
export const updateEmployee: RequestHandler<{id:string}> = (req, res,next) =>{
    const body = req.body;
    const{error} = employeeSchema.validate(body);
    if(error){
        res.status(400).json({message: error.details[0].message});
    }
    else{
        const upName =  (req.body as {name:string}).name;
        const upSalary = (req.body as {salary:number}).salary;
        const upDepartment = (req.body as {department:Department}).department;
        const inputEmpId = +req.params.id;
        const findEmployee = Emp.findIndex(employee=> employee.id === inputEmpId);
        if(findEmployee < 0){
            res.status(404).json({message:'Employee could not be found'});
        }
        else{
            const cur = Emp[findEmployee];
            if(cur.name == upName && cur.salary == upSalary && cur.department == upDepartment){
                res.status(304).json({message:'No Change has been made'});
            }
            else{
                Emp[findEmployee] = new EmployeeDef(Emp[findEmployee].id, upName, upSalary,upDepartment);
                res.status(200).json({message:'Employee Details Updated!' , employee: Emp[findEmployee]});
            }

        }
    }
};

export const deleteEmployee: RequestHandler<{id:string}> =  async(req,res,next) =>{
    const inputEmpId = +req.params.id;
    const response = await pool.query('SELECT * from employees where employee_id = $1', [inputEmpId]);
    if(!response.rows){
        res.status(404).json({message:"Employee could not be found"});
    }
    else{
        await pool.query('DELETE from employees where employee_id = $1', [inputEmpId]);
        res.status(200).json({message:"Employee is deleted", deleted: response.rows});
    }
};