import UserValidation from '../middlewares/validators/usersAuth';
import Authorization from '../middlewares/check-auth';
import Mailer from '../utils/mailer';
import randomString from 'random-string';
import pool from '../db/config';
import GUID from '../middlewares/guid';
import moment from 'moment';


/**
 * @exports
 * @class RideOfferController
 */
class RideOfferController {
    /**
   * Fetch all available ride offers
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  static getAllOffers(req, res, next) {
      const text = `SELECT * FROM offers`;
      pool.query(text,[], (err, offers) =>{
          if (err) return res.status(500).json({message: 'Could not connect to the database'});
          return res.status(200).json({
            offers: offers.rows,
            message: 'All ride offers successfully retrieved',
            success: true
        })
      });
      
  }

  /**
   * Fetch the details of a single ride offer
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  static getARideOffer(req, res, next) {
      const {ridesId} = req.params;

    const text = `SELECT * FROM offers WHERE offer_id = $1`;
    pool.query(text,[ridesId], (err, offers) =>{
        if (err) return res.status(500).json({message: 'Could not connect to the database'});
        if (offers.rowCount < 1) {
            return res.status(404).json({
                message: 'Ride offer does not exist',
                success: false
            })
        }
        return res.status(200).json({
          offers: offers.rows,
          message: 'Ride offer successfully retrieved',
          success: true
      })
    });
  }

    /**
   * @method verifyPassword
   * @memberof Users
   * @param {string} password
   * @param {string} hash
   * @return {Promise} Promise of true or false
   */
  static verifyPassword(password, hash) {
    return bcrypt.compare(password, hash);
  }

  /**
   * Sends password token to user
   * @method forgotPassword
   * @memberof Users
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static forgotPassword(req, res) {
    const {email} = UserValidation.validateForgotPassword(req, res);
 
    const text = `SELECT * FROM users WHERE email = $1`;
    pool.query(text, [email], (err, user) => {
        if (err) {
            return res.status(500).json({message: 'Could not connect to the database'})
        }
        if (user.rowCount < 1) {
            return res.status(401).json({
                message: 'User does not exist'
            });
        }
        const updatedAt = moment().format();
        const token = randomString({ length: 6 });
        const duration = Date.now() + 3600000;
        const update = `UPDATE users SET password_reset_token = ($1), password_reset_token_expiry = ($2), updated_at = ($3) WHERE email = ($4)`;

        pool.query(update, [token,duration,updatedAt,email], (err, user) => {
            if (err) {
                return res.status(500).json({message: 'Could not connect to the database'})
            }
            Mailer.forgotPasswordMail(token, email);

            return res.status(200).json({ 
                message: 'A reset token has been sent to your email address'
            });
        })

    })
}

  /**
   * Sends password token to user
   * @method resetPassword
   * @memberof Users
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static resetPassword(req, res) {
  
    const {email,password, token} = UserValidation.validateResetPassword(req, res);
 
    const text = `SELECT * FROM users WHERE email = $1`;
    pool.query(text, [email], (err, user) => {
        if (err) {
            return res.status(500).json({message: 'Could not connect to the database'})
        }
        if (user.rowCount < 1) {
            return res.status(401).json({
                message: 'User does not exist'
            });
        }
 
        if (token !== user.rows[0].password_reset_token) {
            return res.status(400).json({
                message: 'Password reset token is invalid or has expired'
            })
        }

        const updatedAt = moment().format();
        const passwordResetToken = null;
        const duration = null;
        const update = `UPDATE users SET password = ($1), password_reset_token = ($2), password_reset_token_expiry = ($3), updated_at = ($4) WHERE email = ($5)`;
        const hashedPassword = bcrypt.hashSync(password, 10);
        pool.query(update, [hashedPassword,passwordResetToken,duration,updatedAt,email], (err, user) => {
            if (err) {
                return res.status(500).json({message: 'Could not connect to the database'})
            }
            Mailer.resetPasswordMail(email);

            return res.status(200).json({ 
                message: 'Password has been reset successfully'
            });
        })

    })
  }
}

export default RideOfferController;