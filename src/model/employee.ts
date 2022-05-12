import {Table, Model, Column, DataType} from 'sequelize-typescript';

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


@Table({
    timestamps:false,
    tableName:"employees"
})

export class Employees extends Model{
    @Column({
        type: DataType.NUMBER,
        primaryKey:true,
        allowNull: false
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string;

    @Column({
        type:DataType.NUMBER,
        allowNull:false
    })
    salary!: number;

    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    department!: string;
}

