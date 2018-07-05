const regex = /^[a-zA-Z0-9-]+$/i;
const stringRegex = /^[a-zA-Z_]+( [a-zA-Z_]+)*$/i;
const numberRegex = /^[0-9]+$/i;
const timeRegex = /^[A-Z0-9]+( [A-Z0-9:]+)$/i;
const dateRegex = /^[a-zA-Z0-9]+( [A-Z0-9,]+)$/i;

/**
 * @exports
 * @validateInput function
 */

function validateInput(driver,
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
  date) {
  if (!(driver||vehicleBrand||vehicleColor||vehicleModel||vehiclePlateNo||vehicleYear||availableSeats||finalDestination||currentLocation||timeOfDeparture||route||price||date||img)){
    return "Incomplete details"
  }
  if (typeof driver !== 'string' || driver.length < 1 || stringRegex.test(driver) === false) {
    return "Cross-check driver name input"
  } 
  if (typeof vehicleBrand !== 'string'|| vehicleBrand.length < 1 || stringRegex.test(vehicleBrand) === false) {
    return 'Cross-check vehicle brand input'
  }
  if (typeof vehicleColor !== 'string' || vehicleColor.length < 1 || stringRegex.test(vehicleColor) === false) {
    return 'Cross-check vehicle color'
  }
  if (typeof vehiclePlateNo !== 'string' || vehiclePlateNo.length !== 10 || regex.test(vehiclePlateNo) === false) {
    return 'Cross-check plate number'
  }
  if (typeof vehicleModel !== 'string' || vehicleModel.length < 1 || stringRegex.test(vehicleModel) === false) {
    return 'Cross-check vehicle modek'
  }
  if (typeof vehicleYear !== 'number' || vehicleYear.length < 2000 || numberRegex.test(vehicleYear) === false) {
    return 'Cross-check the year'
  }
  if (typeof availableSeats !== 'number' || availableSeats.length < 1 || numberRegex.test(availableSeats) === false) {
    return 'Cross-check available seats'
  }
  if (typeof timeOfDeparture !== 'string' || timeOfDeparture.length < 3 || timeRegex.test(timeOfDeparture) === false) {
    return 'Cross-check time of departure'
  }
  if (typeof currentLocation !== 'string' || currentLocation.length < 1 || stringRegex.test(currentLocation) === false) {
    return 'Cross-check pick up location'
  }
  if (typeof finalDestination !== 'string' || finalDestination.length < 1 || stringRegex.test(finalDestination) === false) {
    return 'Cross-check destination'
  }
  if (typeof date !== 'string' || date.length < 1 || dateRegex.test(date) === false) {
    return 'Check the date'
  }
  if (typeof route !== 'string' || route.length < 1 || regex.test(route) === false) {
    return 'Check the route'
  }
  if (typeof price !== 'number' || price < 1 || numberRegex.test(price) === false) {
    return 'Check the price'
  }
  if (typeof img !== 'string' || img.length < 1) {
    return 'Check the image'
  }
}
    

//const validInput = validateInput();

export default validateInput;
