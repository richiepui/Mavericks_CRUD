import {RequestHandler, response} from 'express';
import {EmployeeDef, Department, Employees} from '../model/employee'
const {employeeSchema} = require('../model/empValidation')

export const createEmployees: RequestHandler = async (req,res,next) => {
    const body = req.body;
    const{error} = employeeSchema.validate(body);
    if(error){
        res.status(400).json({message: error.details[0].message});
    }
    else{

        const name = (req.body as{name:string}).name;
        const salary = (req.body as{salary:number}).salary;
        const department = (req.body as{department:Department}).department;
        var id = await Employees.count();
        const query = await Employees.findByPk(id);
        if(query){
            id = Math.floor(Math.random()*1000);
        }
        const result = await Employees.create({id: id, name: name, salary: salary, department: department});
        console.log(result);
        res.status(200).json({message:"Employeed Created Successfully", employeeCreated: result});
    }
};

export const getEmployeeById: RequestHandler<{id:string}>= async(req,res,next)=>{
    const inputEmpId = +req.params.id;
    const query = await Employees.findByPk(inputEmpId);
    if(!query){
        res.status(404).json({message:"Employee could not be found"});
    }
    else{
        res.status(200).json({message:"Employee Found", employee: query});
    }
}

export const getEmployees:  RequestHandler = async (req,res,next)=>{
    const query = await Employees.findAll();
    res.status(200).json(query);
}

//Successful, No Change, Bad Request, Cannot be found
export const updateEmployee: RequestHandler<{id:string}> = async(req, res,next) =>{
    const body = req.body;
    const{error} = employeeSchema.validate(body);
    if(error){
        res.status(400).json({message: error.details[0].message});
    }
    else{
        const inputEmpId = +req.params.id;
        const upName =  (req.body as {name:string}).name;
        const upSalary = (req.body as {salary:number}).salary;
        const upDepartment = (req.body as {department:Department}).department;
        const query = await Employees.findByPk(inputEmpId);
        if(!query){
            res.status(404).json({message:'Employee could not be found'});
        }
        else{
            const ret: EmployeeDef = query.toJSON();
            if(upName == ret.name && upSalary == ret.salary && upDepartment == ret.department ){
                res.status(304).json({message:"No Change has been made"});
            }
            else{
                Employees.update({name:upName,salary:upSalary,department:upDepartment},{where:{id:inputEmpId}});
                const newDetails = new EmployeeDef(inputEmpId,upName,upSalary,upDepartment);
                res.status(200).json({message:"Employee Details Updated", newEmpDetails: newDetails});
            }
        }
    }
};

export const deleteEmployee: RequestHandler<{id:string}> =  async(req,res,next) =>{
    const inputEmpId = +req.params.id;
    const query = await Employees.findByPk(inputEmpId);
    if(!query){
        res.status(404).json({message:"Employee could not be found"});
    }
    else{
        await Employees.destroy({where:{id:inputEmpId}});
        res.status(200).json({message:"Employee is deleted", deleted: query});
    }
};