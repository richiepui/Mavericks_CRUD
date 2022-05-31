import {RequestHandler} from 'express';
import {EmployeeDef, Department, Employees} from './employeeModel'
import employeeSchema from './empValidation'

export const createEmployees: RequestHandler = async (req,res,next) => {
    const body = req.body;
    const{error} = employeeSchema.validate(body);
    if(error){
        res.status(400).json({message: error.details[0].message, requestState: 0});
        return;
    }
    const name = (req.body as{name:string}).name;
    const salary = (req.body as{salary:number}).salary;
    const department = (req.body as{department:Department}).department;
    var id = await Employees.count();
    const query = await Employees.findByPk(id);
    if(query){
        id = Math.floor(Math.random()*1000);
    }
    await Employees.create({name:name, salary:salary,department:department});
    res.status(200).json({message:"Employeed Created Successfully", requestState: 1});
};

export const getEmployeeById: RequestHandler<{id:string}>= async(req,res,next)=>{
    const inputEmpId = +req.params.id;
    const query = await Employees.findByPk(inputEmpId);
    if(!query){
        res.status(404).json({message:"Employee could not be found"});
        return;
    }
    res.status(200).json(query);

}

export const getEmployees:  RequestHandler = async (req,res,next)=>{
    const query =  await Employees.findAll({ order: [["id", "ASC"]] });
    res.status(200).json(query);
}


export const updateEmployee: RequestHandler<{id:string}> = async(req, res,next) =>{
    const body = req.body;
    const{error} = employeeSchema.validate(body);
    if(error){
        res.status(400).json({message: error.details[0].message, requestState: 0});
        return;
    }
    const inputEmpId = +req.params.id;
    const upName =  (req.body as {name:string}).name;
    const upSalary = (req.body as {salary:number}).salary;
    const upDepartment = (req.body as {department:Department}).department;
    const query = await Employees.findByPk(inputEmpId);
    if(!query){
        res.status(404).json({message:'Employee could not be found', requestState: 0});
        return;
    }
    const ret : EmployeeDef = query.toJSON();
    if(upName == ret.name && upSalary == ret.salary && upDepartment == ret.department ){
        res.status(304).json({message:"No Change has been made", requestState: 1});
    }
    else{
        await Employees.update({name:upName,salary:upSalary,department:upDepartment},{where:{id:inputEmpId}});
        res.status(200).json({message:"Employee Details Updated", requestState: 1});
    }
};

export const deleteEmployee: RequestHandler<{id:string}> =  async(req,res,next) =>{
    const inputEmpId = +req.params.id;
    const query = Employees.findByPk(inputEmpId);
    if(!query){
        res.status(404).json({message:"Employee could not be found"});
        return;
    }
    await Employees.destroy({where:{id:inputEmpId}});
    res.status(200).json({message:"Employee is deleted", deleted: query});
};