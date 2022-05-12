import {DataType} from 'sequelize-typescript';
import connection from '../database'

//This is a basic model used for validation before inserting/updating into database
export class EmployeeDef{
    constructor(
        public id: number, 
        public name: string,
        public salary: number,
        public department: Department
        ){};
}

export enum Department{
    HR = "HR",
    PS = "PS"
};


//Sequelization Definition for Inserting into the database.
const seq = connection;
export const Employees = seq.define('Employee',{
    //Model Attributes
    id:{type: DataType.NUMBER,primaryKey: true, allowNull:false},
    name:{type: DataType.STRING,allowNull:false},
    salary:{type: DataType.NUMBER,allowNull:false},
    department:{type: DataType.STRING,allowNull:false}},{tableName:'employees',timestamps:false});
