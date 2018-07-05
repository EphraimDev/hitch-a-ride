import {Pool} from 'pg';
/*import dotenv from 'dotenv';

const Pool = require('pg').Pool;
const dotenv = require('dotenv');*/



/*const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

const pool = new Pool(config);*/

const connectionString = 'postgres://postgres:ephaig14@@localhost:5432/Rider';

const pool = new Pool({
    connectionString: connectionString
});

//module.exports = pool;

export default pool;