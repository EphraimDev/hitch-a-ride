import pool from './config';

const text = `DROP TABLE IF EXISTS offers CASCADE;
CREATE TABLE offers(
    id SERIAL NOT NULL,
    user_id TEXT REFERENCES users(user_id) ON DELETE CASCADE,
    offer_id TEXT PRIMARY KEY NOT NULL,
    pick_up_location TEXT NOT NULL,
    destination TEXT NOT NULL,
    time_of_departure TEXT NOT NULL,
    date TEXT NOT NULL,
    price INT NOT NULL,
    available_seats INT NOT NULL,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    deleted_at TIMESTAMPTZ
)`;

const offers = () => {
      pool.query(text)
      .then(response =>console.log(response))
      .catch (err => console.error(err)) 
    }  

export default offers;