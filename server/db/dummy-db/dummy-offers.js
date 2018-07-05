import pool from '../config';

const text = `DELETE FROM offers CASCADE;
INSERT INTO offers(
    offer_id,
    user_id,
    pick_up_location,
    destination,
    time_of_departure,
    date,
    price,
    available_seats,
    created_at
) values(
    '2e00bcef-d3af-6y78-6b85-e9b30a043e28',
    '2e00bcef-d3af-9d13-6b85-e9b30a043e28',
    'Ikeja',
    'Lekki',
    '07:00',
    '07/07/2018',
    1000,
    3,
    '2018-05-06T00:47:03.687Z'
), (
    '2e00bcef-d3af-6y78-6b85-e9b36a783e28',
    '2e00dref-d3af-9d13-6b85-e9b30a043e28',
    'Surulere',
    'Eko-Hotel',
    '14:00',
    '07/07/2018',
    1000,
    3,
    '2018-05-06T00:47:03.687Z'
), (
    '2e00bcef-d3af-6y78-6b85-e9b30a043e20',
    '2e00dref-d3af-9d13-6b85-e9y58a043e28',
    'Festac',
    'Ikeja',
    '17:00',
    '07/07/2018',
    1000,
    3,
    '2018-05-06T00:47:03.687Z'
)`;

const offers = () => {
      pool.query(text)
      .then(response =>console.log(response))
      .catch (err => console.error(err)) 
    }  

export default offers;