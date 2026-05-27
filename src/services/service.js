import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createConnection({
    host: process.env.HOST_,
    user: process.env.USER_,
    password: process.env.PASS_,
    database: process.env.DATABASE_,
    port: process.env.PORT_
}).promise();