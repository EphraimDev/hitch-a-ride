/**
 * @exports
 * @class UserValidation
 */
class UserValidation {

 /**
   * Validate sign up input
   *
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  static validateSignUp(req, res) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
    const regex = /^[a-zA-Z0-9-, ]+$/i;
    const stringRegex = /^[a-zA-Z- ]+( [a-zA-Z- ]+)*$/i;
    const numberRegex = /^[0-9]+$/i;
    const dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const {userId} = req.params;

    const {firstname,
        lastname,
        email, 
        address,
        password,
        dateOfBirth,
        phoneNo,
        vehicleName,
        vehiclePlateNo,
        img
    } = req.body; 
    if (typeof firstname !== 'string' || firstname.length < 1 || stringRegex.test(firstname) === false) {
      res.status(400).json({message: "Cross-check first name input"})
    } 
    if (typeof lastname !== 'string'|| lastname.length < 1 || stringRegex.test(lastname) === false) {
      res.status(400).json({message: 'Cross-check vehicle brand input'})
    }
    if (typeof vehicleName !== 'string' || stringRegex.test(vehicleName) === false) {
      res.status(400).send({message:'Cross-check vehicle color'})
    }
    if (typeof vehiclePlateNo !== 'string' || regex.test(vehiclePlateNo) === false) {
      res.status(400).send({message: 'Cross-check plate number'})
    }
    if (typeof address !== 'string' || address.length < 1 || regex.test(address) === false) {
        res.status(400).send({message: 'Check the address'})
    }
    if (typeof phoneNo !== 'string' || phoneNo.length !== 11 || numberRegex.test(phoneNo) === false) {
    res.status(400).send({message: 'Check the phone number'})
    }
    if (typeof email !== 'string' || email.length < 4 || emailRegex.test(email) === false) {
    res.status(400).send({message: 'Check the email'})
    }
    if (typeof dateOfBirth !== 'string' || dateOfBirth.length < 1 || dateRegex.test(dateOfBirth) === false) {
      res.status(400).send({message: 'Check the date; Acceptable date format is dd/mm/yyyy'})
    }
    if (typeof password !== 'string' || password.length < 8 || passwordRegex.test(password) === false) {
      res.status(400).send({message: 'Password must contin minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'})
    }
    if (typeof img !== 'string') {
      res.status(400).send({message: 'Check the image'})
    }
    return {firstname,lastname,userId,vehicleName,vehiclePlateNo,img,dateOfBirth,password,email,address,phoneNo}
  }

  /**
   * Validate login input
   *
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  static validateLogin(req, res) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const {
        email,
        password,
    } = req.body; 

    if (typeof email !== 'string' || email.length < 4 || emailRegex.test(email) === false) {
    res.status(400).send({message: 'Check the email'})
    }
    if (typeof password !== 'string' || password.length < 8 || passwordRegex.test(password) === false) {
      res.status(400).send({message: 'Password must contin minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'})
    }
    return {password,email}
  }

  /**
   * Validate email for forgot password method
   *
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  static validateForgotPassword(req, res) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const {
        email
    } = req.body; 

    if (typeof email !== 'string' || email.length < 4 || emailRegex.test(email) === false) {
    res.status(400).send({message: 'Check the email'})
    }
    return {email}
  }

  /**
   * Validate reset password method
   *
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  static validateResetPassword(req, res, next) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;

    const {
        email,
        password,
        repeatPassword,
        token
    } = req.body; 

    if (!email || typeof email !== 'string' || emailRegex.test(email) === false) {
        return res.status(400).send({message: 'Check the email'});
    }
    if (!password || typeof password !== 'string' || passwordRegex.test(password) === false) {
        return res.status(400).send({message: 'Password must contin minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'});
      }
    if (!repeatPassword || repeatPassword !== password) {
        return res.status(400).send({message: 'Password must be the same'})
    }
    if (!token) {
        return res.status(400).send({message: 'Type in the correct token'})
    }
    
    return {email, password, repeatPassword, token}
  }



}

export default UserValidation;