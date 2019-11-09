import GoogleMaps from "@google/maps";
import { promisify } from "util";
import get from "lodash.get";

import { calculateEmissions } from "./carbonHelpers";
import { TRANSPORT_TYPES } from "./transportHelpers";

const googleMapsClient = GoogleMaps.createClient({
  key: process.env.GOOGLE_MAPS_API_KEY
});

export async function getDirections(
  origin,
  destination,
  mode = TRANSPORT_TYPES.DRIVING
) {
  const asyncDirections = promisify(googleMapsClient.directions);
  try {
    const directions = await asyncDirections({
      origin,
      destination,
      mode: mode.toLowerCase()
    });

    return directions;
  } catch (e) {
    throw new Error(`Error occurred retrieving directions: ${e.message}`);
  }
}

// get each mode and distance, and call calculateEmissions
export function totalEmissionsForRoute(response) {
  const steps = get(response, "json.routes[0].legs[0].steps") || [];
  const modesAndDistances = steps.reduce((total, step) => {
    const travelMode = get(step, "travel_mode");
    if (travelMode) {
      if (!total[travelMode]) {
        total[travelMode] = 0;
      }

      const distance = get(step, "distance.value");
      total[travelMode] += distance;
    }

    return total;
  }, {});
  return Object.entries(modesAndDistances).reduce((sum, [mode, distance]) => {
    sum += calculateEmissions(distance, mode);

    return sum;
  }, 0);
}
