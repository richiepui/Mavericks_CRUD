import {RequestHandler, response} from 'express';
import {EmployeeDef, Department} from '../model/employee'
const {employeeSchema} = require('../model/empValidation')
import {pool} from '../database'

const Emp: EmployeeDef[] = [];

export const createEmployees: RequestHandler = async (req,res,next) => {
    const body = req.body;
    const{error} = employeeSchema.validate(body);
    if(error){
        res.status(400).json({message: error.details[0].message});
    }
    else{
        const name  = (req.body as{name:string}).name;
        const salary = (req.body as{salary:number}).salary;
        const department = (req.body as{department:Department}).department;

        const query = await pool.query('select * from employees');
        const queryCount = query.rowCount;
        var newId = queryCount;
        const response = await pool.query('select * from employees where employee_id = $1',[newId]);
        if (response.rows.length > 0){
            newId = Math.floor(Math.random()*1000);
        }
        const newEmp = new EmployeeDef(newId,name,salary,department);
        await pool.query('INSERT INTO employees (employee_id, employee_name, employee_salary, employee_department) VALUES($1,$2,$3,$4)'
        ,[newEmp.id,newEmp.name,newEmp.salary,newEmp.department]);
        res.status(200).json({message:'Employee Created Successfully', employeeCreated: newEmp});
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


export const updateEmployee: RequestHandler<{id:string}> = async(req, res,next) =>{
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
        const response = await pool.query('SELECT * from employees where employee_id = $1', [inputEmpId]);
        if (!response.rows.length){
            res.status(404).json({message: 'Employee could not be found'});
        }
        else{
            const empMap = pool.map('SELECT * from employees where employee_id =$1', [inputEmpId]);
        }

        // else{
        //     const cur = Emp[findEmployee];
        //     if(cur.name == upName && cur.salary == upSalary && cur.department == upDepartment){
        //         res.status(304).json({message:'No Change has been made'});
        //     }
        //     else{
        //         Emp[findEmployee] = new EmployeeDef(Emp[findEmployee].id, upName, upSalary,upDepartment);
        //         res.status(200).json({message:'Employee Details Updated!' , employee: Emp[findEmployee]});
        //     }

        // }
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