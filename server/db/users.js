import pool from './config';
 
const text = `DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    id SERIAL NOT NULL,
    user_id TEXT PRIMARY KEY NOT NULL,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    phone_number BIGINT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    address TEXT NOT NULL,
    password TEXT NOT NULL,
    date_of_birth TEXT NOT NULL,
    img TEXT UNIQUE,
    vehicle_name TEXT UNIQUE,
    vehicle_plate_no TEXT UNIQUE,
    password_reset_token TEXT,
    password_reset_token_expiry BIGINT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)`;

const users = () => {
      pool.query(text)
      .then(response =>console.log(response))
      .catch (err => console.error(err)) 
    }  

export default users;