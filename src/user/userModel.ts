import {DataType, Table, Model, Column, PrimaryKey, AllowNull} from 'sequelize-typescript'
import connection from '../database'

export class User{
    constructor(
        public id: number,
        public username: string,
        public password: string
    ){}
}

// const seq = connection;
// export const Users = seq.define('Users',{
//     id:{type: DataType.NUMBER, primaryKey: true, allowNull:false},
//     username:{type: DataType.STRING, allowNull: false, unique: true},
//     password:{type: DataType.STRING, allowNull: false}
// })

@Table({
    timestamps: false,
    tableName: 'users'
})

export class Users extends Model{
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    username!: string

    @Column({
        allowNull:false,
        type: DataType.STRING,
    })
    password!: string
}