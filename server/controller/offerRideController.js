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
    const {
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
    route
    } = req.body;

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
      route
    }
    rides.push(newRideOffer)
      
         return res.status(201).json({
            status: 'success',
            message: 'Ride created successfully',
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

    rides.map((ride, index) => {
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
  });

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
   * Get all meals
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
   * Update an existing meal
   *
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  static update(req, res, _next) {
    const {
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
      route
      } = req.body;
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
        message: '',
        success: 'false'
      });
    }

    const updatedRide = {
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
      route
    };

    rides.splice(rideIndex, 1, newRide);

    return res.status(201).send({
      success:'true',
      message: '',
      updatedRide
    });
  }
}

export default DriverController;
