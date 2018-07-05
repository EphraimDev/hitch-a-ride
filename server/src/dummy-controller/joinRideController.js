import requests from '../model/requestRide';
import GUID from '../middleware/guid';

/**
 * @exports
 * @class DriverController
 */
class JoinRideController {
  /**
   * Creates a request 
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  static create(req, res, _next) {
    const {name, noOfSeats, address, pickUp, date, phoneNo, destination, email, time} = JoinRideController.validateInput(req, res);
    
    const requestFound = requests.find(requestRide => requestRide.name === name);
   
    if (requestFound.time === time && requestFound.date === date) {
      return res.status(404).send({
        message: 'Request for this date and time has been made already',
        success: false
      });
    }

    const newRideRequest = {
      id: GUID,
      name,
      phoneNo,
      email,
      address,
      noOfSeats,
      pickUp,
      destination,
      time,
      date
    }
    requests.push(newRideRequest);
    return res.status(201).json({
      success: true,
      message: 'Ride request created successfully',
      newRideRequest
    });
  }

  /**
   * Deletes a request offer
   *
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  static delete(req, res) {
    const requestId = req.params.requestId;

    const requestFound = requests.find(request => request.id === requestId);
    
    // return if ride offer is found
    if (requestFound) {
      requests.splice(requests.indexOf(requestFound), 1);
      res.status(200).send({
        message: `Request id ${requestId} was deleted successfully`,
        success: true
      });
    }

    // return if ride offer does not exist
    return res.status(404).send({
      message: 'Request not found',
      success: false
    });

    /*rides.map((ride, index) => {
      if (ride.id === rideId) {
          rides.splice(index, 1);
          //res.setHeader('content-type', 'application/json');
          res.status(200).send({
            message: `Ride id ${rideId} was deleted successfully`,
            success: 'true'
          });
          res.end();
      } else {
        return res.status(404).send({
          message: 'Ride not found',
          success: 'false'
      });
      }
  });*/

    
      
}

  /**
   * Return request that matches requestId
   *
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  static getRequest(req, res) {
    const requestId = req.params.requestId;

    // find ride request with params id
    const requestFound = requests.find(request => request.id === requestId);
    
    // return if ride request is found
    if (requestFound) {
      return res.status(200).send({
        message: `Request id ${requestId} was found`,
        requestFound,
      });
    }

    // return if ride request does not exist
    return res.status(404).send({
      message: `Request id ${requestId} does not exist`,
    });

  }

  /**
   * Get all requests
   *
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static getAllRequests(_req, res) {
    res.status(200).send({
        message: 'Ride requests were retrieved successfully',
        requests,
      });
    }

  /**
   * Update an existing request
   *
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  static update(req, res, _next) {
    const {requestId} = req.params;
    
    //Check if such request exists
    let requestFound; 
    let requestIndex;
    requests.map((request, index) => {
      if (request.id === requestId) {
        requestFound = request;
        requestIndex = index;
      }
    });

    // return if ride request does not exist
    if (!requestFound) {
      //console.log(requestFound.name);
      return res.status(404).send({
        message: 'Ride request does not exist',
        success: false
      });
    }

    const {name, phoneNo, address, email, pickUp, destination, time, date, noOfSeats} = JoinRideController.validateInput(req, res);

    const updatedRequest = {
      id: requestId,
      name,
      phoneNo,
      email,
      address,
      noOfSeats,
      pickUp,
      destination,
      time,
      date
    };

    requests.splice(requestIndex, 1, updatedRequest);

    return res.status(201).send({
      success:true,
      message: 'Ride request has been updated successfully',
      updatedRequest
    });
  }

  /**
   * Validate ride request data
   *
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  static validateInput(req, res) {
    const regex = /^[a-zA-Z0-9-, ]+$/i;
    const stringRegex = /^[a-zA-Z- ]+( [a-zA-Z- ]+)*$/i;
    const numberRegex = /^[0-9]+$/i;
    const timeRegex = /^\d{1,2}:\d{2}([ap]m)?$/;
    const dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    const {requestId} = req.params;

    const {
      name,
      phoneNo,
      email,
      address,
      noOfSeats,
      pickUp,
      destination,
      time,
      date
    } = req.body; 
    if (typeof name !== 'string' || name.length < 1 || stringRegex.test(name) === false) {
      res.status(400).json({message: "Cross-check name input"})
    } 
    if (typeof noOfSeats !== 'number' || noOfSeats < 1 || numberRegex.test(noOfSeats) === false) {
      res.status(400).send({message: 'Cross-check number of seats requested for'})
    }
    if (typeof time !== 'string' || timeRegex.test(time) === false) {
      res.status(400).send({message: 'Cross-check time; Acceptable time format is hh:mm'})
    }
    if (typeof pickUp !== 'string' || pickUp.length < 1 || stringRegex.test(pickUp) === false) {
      res.status(400).send({message: 'Cross-check pick up location'})
    }
    if (typeof destination !== 'string' || destination.length < 1 || stringRegex.test(destination) === false) {
      res.status(400).send({message: 'Cross-check destination'})
    }
    if (typeof date !== 'string' || date.length < 1 || dateRegex.test(date) === false) {
      res.status(400).send({message: 'Check the date; Acceptable date format is dd/mm/yyyy'})
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
    return {name,requestId,email,phoneNo,address,date,noOfSeats,destination,pickUp,time}
  }
}

export default JoinRideController;
