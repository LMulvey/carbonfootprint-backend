/**
 * Method for calculating carbon emissions for a single vehicle trip.
 * @param {Interger} distance  - distance of travel in kilometers
 */
export function calculateVehicleEmissions(distance) {
  if (typeof distance !== 'number') {
    throw new Error('Invalid distance provided. Distance should be a number in kilometers.');
  }

  /**
   * This number is based off of IEA GFEI report for Fuel Economy.
   * 206 grams of CO2/KM travelled was the national average for Canada
   * for 2017. We convert to kilograms for calculations.
   * See: https://www.iea.org/topics/transport/gfei/
   */
  const EMISSION_FACTOR_PER_KM = 0.206;
  return distance * EMISSION_FACTOR_PER_KM;
}