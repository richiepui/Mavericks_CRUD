"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const { Pool } = require('pg');
exports.pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'cf090303',
    database: 'Mavericks',
    port: '5432'
});
