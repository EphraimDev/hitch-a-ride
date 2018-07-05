import pool from '../config';

const text = `DELETE FROM users CASCADE;
INSERT INTO users(
    user_id,
    firstname, 
    lastname,
    phone_number,
    email,
    address,
    password,
    date_of_birth,
    img,
    vehicle_name,
    vehicle_plate_no,
    created_at
) VALUES(
    '2e00bcef-d3af-9d13-6b85-e9b30a043e28',
    'Chima',
    'Amodu',
    07033771198,
    'chima@amodu.com',
    'Ikeja',
    '$2b$10$ckZlQ80IJTrVo8xnZgkh9OjeyahZu2S72Ny50Dz2co1yLhnK36d6u',
    '20/02/1985',
    'https://img.buzzfeed.com/buzzfeed-static/static/2017-03/20/16/campaign_images/buzzfeed-prod-fastlane-01/build-a-perfect-man-and-well-reveal-your-emotiona-2-24401-1490040929-0_dblbig.jpg',
    'Toyota',
    'SGT23MJC',
    '2018-05-06T00:47:03.687Z'
), (
    '2e00dref-d3af-9d13-6b85-e9b30a043e28',
    'Ahmed',
    'Fred',
    08040040046,
    'ahmed@fred.com',
    'Surulere',
    '$2b$10$ckZlQ80IJTrVo8xnZgkh9OjdflhZu2S72Ny50Dz2co1yLhnK36d6u',
    '05/07/1982',
    'https://i.kinja-img.com/gawker-media/image/upload/s--_DBGLHVf--/c_scale,f_auto,fl_progressive,q_80,w_800/eibgv7kctah62iddzywm.jpg',
    'Honda Civic',
    'MVN56GHT',
    '2018-07-04 22:46:19'
), (
    '2e00dref-d3af-9d13-6b85-e9y58a043e28',
    'Ebuka',
    'Jerry',
    08040040768,
    'ebuka@gmail.com',
    'Festac',
    '$2b$10$ckZlQ80IJTrVo8xnZgkh9OjdflhZu2S72Ny50Dz2er9oLhnK36d6u',
    '05/07/2018',
    'https://cdn.themodestman.com/wp-content/uploads/2018/01/fp1-mobile-4.jpg',
    'Kia',
    'ADT678IU',
    '2018-07-05 22:46:19'
)`;

const users = () => {
      pool.query(text)
      .then(response =>console.log(response))
      .catch (err => console.error(err)) 
    }  

export default users;