import pool from './config';

const text = `DROP TABLE IF EXISTS requests CASCADE;
CREATE TABLE requests(
    id SERIAL NOT NULL,
    join_id TEXT PRIMARY KEY NOT NULL UNIQUE,
    user_id TEXT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    offer_id TEXT NOT NULL REFERENCES offers(offer_id) ON DELETE RESTRICT,
    no_of_seats INT NOT NULL,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    deleted_at TIMESTAMPTZ
)`;

const join = () => {
      pool.query(text)
      .then(response =>console.log(response))
      .catch (err => console.error(err)) 
    }  

export default join;