import nodemailer from 'nodemailer';
import configure from '../config';
import { config } from 'dotenv';
//import db from '../models';

config();
const url = process.env.BASE_URL
 
/**
 * Mailer Event Emitter
 * @exports
 * @class Mailer
 * @extends EventEmitter
 */
class Mailer {
  /**
   * Sends Mail
   * @method sendMail
   * @memberof Mailer
   * @param {string} to
   * @param {string} subject
   * @param {string} message
   * @returns {nothing} returns nothing
   */ 
  static sendMail({ to, subject, message }) {
    //create reusable transporter object
    const transporter = nodemailer.createTransport(configure.mail.smtpConfig);

    //setup email data
    const mailOptions = {
      from: '"Hitch A Ride" <noreply@hitch-a-ride.com>',
      to,
      cc: 'hitcharide@gmail.com',
      subject,
      html: message 
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log(info.messageId);
    });
  }

  /**
   * Sends Mail to Customer when Caterer adds the order for the day
   * @method menuMail
   * @memberof Mailer
   * @param {array} meals
   * @param {string} businessName
   * @returns {nothing} returns nothing
   */
  static menuMail(meals) {
    return db.User.findAll({ where: { role: 'customer' }, attributes: ['firstname', 'email'] })
      .then((customers) => {
        customers.forEach((customer) => {
          const mealList = meals.map(meal => `<li>${meal}</li>`);
          const message =
            `<div>
            <p style="text-transform: capitalize;">Hello ${customer.firstname},</p>
            <p>The following meal(s) has been added to the menu for today</p>
            <ul>
            ${mealList.join('')}
            </ul>
            <p>You can order now at <a href='https://${url}/menu'>Book A Meal</a></p>
            <p>Have a great day.</p>
            </div>`;

          return Mailer.sendMail({
            to: customer.email,
            subject: 'Menu for Today',
            message
          });
        });
      }); 
  }

  /**
   * Sends Mail to Caterer when an order is placed
   * @method catererOrderMail
   * @memberof Mailer
   * @param {object} order
   * @param {object} customer
   * @param {string} catererId
   * @returns {nothing} returns nothing
   */
  static catererOrderMail(order, customer, catererId) {
    return db.User.findOne({ where: { userId: catererId }, attributes: ['userId', 'businessName', 'email'] })
      .then((caterer) => {
        const mealList = order.meals[catererId].map(meal =>
          `<tr><td>${meal.title} (${meal.OrderItem.quantity})</td><td>&#8358;${meal.price}</td></tr>`);
        const totalPrice = order.meals[catererId].reduce((total, meal) =>
          total + (meal.price * meal.OrderItem.quantity), 0);
        const message =
            `<div>
            <p style="text-transform: capitalize;">Hello ${caterer.businessName},</p>
            <p>${customer.firstname} ${customer.lastname} just ordered your meal(s).</p>
            <p>Order Details: </p>
            <table>
            <tbody>
              ${mealList.join('')}
            </tbody>
            <tfoot><tr><th></th><th>&#8358;${totalPrice}</th></tr></tfoot>
            </table>
            <p>See your <a href='https://${url}/${caterer.userId}/orders'>order details</a></p>
            <p>Remember that a happy customer keeps coming back.</p>
            <p>Have a great day filling bellies.</p>
            </div>`;

        return Mailer.sendMail({
          to: caterer.email,
          subject: `Order #${order.orderId}`,
          message
        });
      });
  }

  /**
   * Sends Mail for user to use to reset his password
   * @method forgotPasswordMail
   * @memberof Mailer
   * @param {string} token
   * @param {string} email
   * @returns {nothing} returns nothing
   */
  static forgotPasswordMail(token, email) {
    const message =
      `<div>
      <p style="text-transform: capitalize;">Hi,</p>
      <p>You recently requested to reset your password. If this wasn't you, please ignore this mail.</p>
      <p>You can click on or copy this link: <a href='https://${url}/reset_password?token=${token}'>
      https://${url}/reset_password?token=${token}</a> to reset your password</p>
      <p>This link expires in 1 hour.</p>
      <p>Have a great day.</p>
      </div>`;

    return Mailer.sendMail({
      to: email,
      subject: 'Reset Password',
      message
    });
  }

  /**
   * Sends Mail after user succesfully reset his password
   * @method resetPasswordMail
   * @memberof Mailer
   * @param {string} email
   * @returns {nothing} returns nothing
   */
  static resetPasswordMail(email) {
    const message =
      `<div>
      <p style="text-transform: capitalize;">Hi,</p>
      <p>Your password was reset succesfully.</p>
      <p><a href='https://${url}/signin'>Login</a> to your account.</p>
      </div>`;

    return Mailer.sendMail({
      to: email,
      subject: 'Password Reset Successful',
      message
    });
  }

  /**
   * Sends Mail after user succesfully creates an account
   * @method createAccountMessage
   * @memberof Mailer
   * @param {string} email
   * @returns {nothing} returns nothing
   */
  static createAccountMessage(email) {
    const message =
      `<div>
      <p style="text-transform: capitalize;">Hi,</p>
      <p>Your account was created succesfully.</p>
      <p><a href='https://${url}/signin'>Login</a> to your account.</p>
      </div>`;

    return Mailer.sendMail({
      to: email,
      subject: 'Create Account Successful',
      message
    });
  }
}

export default Mailer;
