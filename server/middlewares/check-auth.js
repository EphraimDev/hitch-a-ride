import jwt from 'jsonwebtoken';
import config from '../config';
import pool from '../db/config';

const secret = config.jwtSecret; 

/** 
 * @exports
 * @class Authorization
 */
class Authorization {
  /**
   * @method generateToken
   * @memberof Authorization
   * @param {object} user
   * @returns {string} token
   * expires in 48 hours
   */
  static generateToken(user) {
    const token = jwt.sign(
      {
        userId: user.user_Id,
        email: user.email,
        password: user.password
      },
      secret,
      {
        expiresIn: 172800
      }
    );

    return token;
  }

  /**
   * Authorize user
   * @method authorize
   * @memberof Authorization 
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {(function|object)} Function next() or JSON object
   */
  static authorize(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token); 
      const decoded = jwt.verify(token, secret);
      const text = `SELECT * FROM users where email = ${user.email}`;
      const foundUser = pool.query(text);
      req.user = decoded;
      req.userId = foundUser.user_id;
      //req.role = foundUser.role;

      next();
    } catch (err) {
      return res.status(401).json({
        message: 'Token is invalid or not provided'
      });
    }
  };
}

export default Authorization;
