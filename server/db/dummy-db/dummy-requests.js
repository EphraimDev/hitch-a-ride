import pool from '../config';

const text = `DELETE FROM requests CASCADE;
INSERT INTO requests(
    join_id,
    offer_id,
    user_id, 
    no_of_seats,
    created_at
) values(
    '2e00bcef-d3af-6y78-6b85-e9b30a043e28',
    '2e00bcef-d3af-6y78-6b85-e9b30a043e28',
    '2e00dref-d3af-9d13-6b85-e9b30a043e28',
    1,
    '2018-05-06T00:47:03.687Z'
), (
    '2e00bcef-d3af-6y78-6b85-e9b36a783e28',
    '2e00bcef-d3af-6y78-6b85-e9b36a783e28',
    '2e00dref-d3af-9d13-6b85-e9y58a043e28',
    2,
    '2018-05-06T00:47:03.687Z'
), (
    '2e00bcef-d3af-6y78-6b85-e9b30a043e20',
    '2e00bcef-d3af-6y78-6b85-e9b30a043e20',
    '2e00bcef-d3af-9d13-6b85-e9b30a043e28',
    1,
    '2018-05-06T00:47:03.687Z'
)`;

const requests = () => {
      pool.query(text)
      .then(response =>console.log(response))
      .catch (err => console.error(err)) 
    }  

export default requests;