import rides from '../model/rideOffers';
import GUID from '../middleware/guid';

/**
 * @exports
 * @class DriverController
 */
class DriverController {

  /**
   * Creates a new ride offer 
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  static create(req, res, _next) {
    
    const {driver,
      vehicleBrand,
      vehicleModel,
      vehiclePlateNo,
      vehicleColor,
      vehicleYear,
      availableSeats,
      currentLocation,
      finalDestination,
      timeOfDeparture,
      price,
      img,
      route,
      date} = DriverController.validateInput(req, res);
    const rideFound = rides.find(ride => ride.vehiclePlateNo === vehiclePlateNo);

    if (rideFound) {
      return res.status(404).send({
        message: `Ride with plate number ${vehiclePlateNo} already exists`,
        success: false
      });
    }
      const newRideOffer = {
        id: GUID,
        driver,
        vehicleBrand,
        vehicleModel,
        vehiclePlateNo,
        vehicleColor,
        vehicleYear,
        availableSeats,
        currentLocation,
        finalDestination,
        timeOfDeparture,
        price,
        img,
        route,
        date
      }
  
      //if (validInput){return false}
  
      rides.push(newRideOffer)
        
           return res.status(200).json({
              success: true,
              message: 'Ride offer created successfully',
              newRideOffer
            }); 
  }

  /**
   * Deletes a ride offer
   *
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  static deleteRide(req, res) {
    const rideId = req.params.rideId;

    const rideFound = rides.find(ride => ride.id === rideId);
 
    if (rideFound) {
      rides.splice(rides.indexOf(rideFound), 1);
          
          res.status(200).send({
            message: `Ride id ${rideId} was deleted successfully`,
            success: true
          });
    }

    return res.status(404).send({
      message: 'Ride not found',
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

    // return if ride offer does not exist
      
}

  /**
   * Return ride that matches rideId
   *
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  static getRide(req, res) {
    const rideId = req.params.rideId;

    // find ride with params id
     const rideFound = rides.find(ride => ride.id === rideId);
    if (rideFound) {
      return res.status(200).send({
        message: `Ride id ${rideId} was found`,
        rideFound,
      });
    }
    return res.status(404).send({
      message: `Ride id ${rideId} does not exist`,
    });

  }

  /**
   * Get all ride offers
   *
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static getAllRideOffers(_req, res) {
    res.status(200).send({
        message: 'Rides where retrieved successfully',
        rides,
      });
    }

  /**
   * Update an existing ride offer
   *
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  static update(req, res, _next) {
    const { rideId } = req.params;
    let rideFound;
    let rideIndex;
    rides.map((ride, index) => {
      if (ride.id === rideId) {
        rideFound = ride;
        rideIndex = index;
      }
    });

    if (!rideFound) {
      return res.status(404).send({
        message: 'Ride offer does not exist',
        success: false
      });
    }

    const {driver,
      vehicleBrand,
      vehicleModel,
      vehiclePlateNo,
      vehicleColor,
      vehicleYear,
      availableSeats,
      currentLocation,
      finalDestination,
      timeOfDeparture,
      price,
      img,
      route,
      date} = DriverController.validateInput(req, res);

    const updatedRide = {
      id: rideId,
      driver,
      vehicleBrand,
      vehicleModel,
      vehiclePlateNo,
      vehicleColor,
      vehicleYear,
      availableSeats,
      currentLocation,
      finalDestination,
      timeOfDeparture,
      price,
      img,
      date,
      route
    };

    rides.splice(rideIndex, 1, updatedRide);

    return res.status(201).send({
      success: true,
      message: 'Updated successfully',
      updatedRide
    });
  }

  /**
   * Validate ride offer data
   *
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  static validateInput(req, res) {
    const regex = /^[a-zA-Z0-9- ]+$/i;
    const stringRegex = /^[a-zA-Z- ]+( [a-zA-Z- ]+)*$/i;
    const numberRegex = /^[0-9]+$/i;
    const timeRegex = /^[A-Z0-9:]+( [A-Z0-9]+)*$/i;
    const dateRegex = /^[a-zA-Z0-9, ]+( [A-Z0-9,]+)$/i;

    const {rideId} = req.params;

    const {driver,
      vehicleBrand,
      vehicleModel,
      vehiclePlateNo,
      vehicleColor,
      vehicleYear,
      availableSeats,
      currentLocation,
      finalDestination,
      timeOfDeparture,
      price,
      img,
      route,
      date
    } = req.body; 
    if (typeof driver !== 'string' || driver.length < 1 || stringRegex.test(driver) === false) {
      res.status(400).json({message: "Cross-check driver name input"})
    } 
    if (typeof vehicleBrand !== 'string'|| vehicleBrand.length < 1 || stringRegex.test(vehicleBrand) === false) {
      res.status(400).send({message: 'Cross-check vehicle brand input'})
    }
    if (typeof vehicleColor !== 'string' || vehicleColor.length < 1 || stringRegex.test(vehicleColor) === false) {
      res.status(400).send({message:'Cross-check vehicle color'})
    }
    if (typeof vehiclePlateNo !== 'string' || vehiclePlateNo.length !== 10 || regex.test(vehiclePlateNo) === false) {
      res.status(400).send({message: 'Cross-check plate number'})
    }
    if (typeof vehicleModel !== 'string' || vehicleModel.length < 1 || stringRegex.test(vehicleModel) === false) {
      res.status(400).send({message: 'Cross-check vehicle model'})
    }
    if (typeof vehicleYear !== 'number' || vehicleYear.length < 2000 || numberRegex.test(vehicleYear) === false) {
      res.status(400).send({message: 'Cross-check the year'})
    }
    if (typeof availableSeats !== 'number' || availableSeats.length < 1 || numberRegex.test(availableSeats) === false) {
      res.status(400).send({message: 'Cross-check available seats'})
    }
    if (typeof timeOfDeparture !== 'string' || timeOfDeparture.length < 3 || timeRegex.test(timeOfDeparture) === false) {
      res.status(400).send({message: 'Cross-check time of departure'})
    }
    if (typeof currentLocation !== 'string' || currentLocation.length < 1 || stringRegex.test(currentLocation) === false) {
      res.status(400).send({message: 'Cross-check pick up location'})
    }
    if (typeof finalDestination !== 'string' || finalDestination.length < 1 || stringRegex.test(finalDestination) === false) {
      res.status(400).send({message: 'Cross-check destination'})
    }
    if (typeof date !== 'string' || date.length < 1 || dateRegex.test(date) === false) {
      res.status(400).send({message: 'Check the date'})
    }
    if (typeof route !== 'string' || route.length < 1 || regex.test(route) === false) {
      res.status(400).send({message: 'Check the route'})
    }
    if (typeof price !== 'number' || price < 1 || numberRegex.test(price) === false) {
      res.status(400).send({message: 'Check the price'})
    }
    if (typeof img !== 'string' || img.length < 1) {
      res.status(400).send({message: 'Check the image'})
    }
    return {driver,rideId,vehicleBrand,vehicleModel,vehiclePlateNo,vehicleColor,vehicleYear,availableSeats,currentLocation,finalDestination,timeOfDeparture,price,img,route,date}
  }
}

export default DriverController;
