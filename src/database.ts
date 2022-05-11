const{Pool} = require('pg');

export const pool = new Pool({
    user:'postgres',
    host:'localhost',
    password:'cf090303',
    database:'Mavericks',
    port: '5432'
})