import { TRANSPORT_TYPES, validateTransportType } from "./transportHelpers";

/**
 * Helper method to return the proper emissions factor for each transportation type.
 * Additionally validates the input to confirm that we support the passed in transportation type.
 * @param {String} transportType - type of transport to calculate emissions for
 */
function resolveEmissionFactor(transportType) {
  const emissionFactorMap = {
    /**
     * This number is based off of IEA GFEI report for Fuel Economy.
     * 206 grams of CO2/KM travelled was the national average for Canada
     * for 2017. We convert to kilograms for calculations.
     * See: https://www.iea.org/topics/transport/gfei/
     */
    [TRANSPORT_TYPES.VEHICLE]: 0.206,

    // TODO: Find an actual value for public transport
    [TRANSPORT_TYPES.PUBLIC]: 0,

    // TODO: Validate that these are ACTUALLY zero.
    [TRANSPORT_TYPES.BIKE]: 0,
    [TRANSPORT_TYPES.WALK]: 0
  };

  const validTransportType = validateTransportType(transportType);
  return emissionFactorMap[validTransportType];
}

/**
 * Method for calculating carbon emissions for a single vehicle trip.
 * @param {Interger} distance  - distance of travel in kilometers
 */
export function calculateEmissions(distance, transportType) {
  if (typeof distance !== "number") {
    console.log("Error occurred");
    throw new Error(
      "Invalid distance provided. Distance should be a number in kilometers."
    );
  }

  const EMISSION_FACTOR_PER_KM = resolveEmissionFactor(transportType);
  return (distance * EMISSION_FACTOR_PER_KM).toFixed(4);
}
