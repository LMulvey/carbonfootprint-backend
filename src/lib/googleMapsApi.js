import GoogleMaps from "@google/maps";
import { promisify } from "util";
import Polyline from "@mapbox/polyline";
import get from "lodash.get";

import { calculateEmissions } from "./carbonHelpers";
import { TRANSPORT_TYPES } from "./transportHelpers";

export async function getDirections(
  origin,
  destination,
  mode = TRANSPORT_TYPES.DRIVING
) {
  const googleMapsClient = GoogleMaps.createClient({
    key: process.env.GOOGLE_MAPS_API_KEY
  });
  const asyncDirections = promisify(googleMapsClient.directions);
  try {
    const directions = await asyncDirections({
      origin,
      destination,
      mode: mode.toLowerCase()
    });
    return directions.json;
  } catch (e) {
    console.log({ apiKey: process.env.GOOGLE_MAPS_API_KEY, googleMapsClient });
    throw new Error(
      `Error occurred retrieving directions: ${JSON.stringify(e)}`
    );
  }
}

export async function getRoutesForAllTypes(origin, destination) {
  const transitRoute = await getDirections(
    origin,
    destination,
    TRANSPORT_TYPES.TRANSIT
  );
  const bikeRoute = await getDirections(
    origin,
    destination,
    TRANSPORT_TYPES.BICYCLING
  );
  const walkingRoute = await getDirections(
    origin,
    destination,
    TRANSPORT_TYPES.WALKING
  );
  const drivingRoute = await getDirections(
    origin,
    destination,
    TRANSPORT_TYPES.DRIVING
  );
  const routePayload = {
    [TRANSPORT_TYPES.TRANSIT]: transitRoute,
    [TRANSPORT_TYPES.BICYCLING]: bikeRoute,
    [TRANSPORT_TYPES.WALKING]: walkingRoute,
    [TRANSPORT_TYPES.DRIVING]: drivingRoute
  };

  return prepareRouteAndEmissionsResponse(routePayload);
}

function prepareRouteAndEmissionsResponse(routes) {
  if (typeof routes !== "object") {
    throw new Error("Invalid routes input");
  }

  const routeResponse = Object.entries(routes).reduce((acc, [type, data]) => {
    const polyline = get(data, "routes[0].overview_polyline.points");
    const totalEmissionsForRoute = calcEmissionsForRoute(data);
    const polyCoords = convertPolylineToCords(polyline);
    acc[type] = {
      googleData: data,
      polyCoords,
      totalEmissionsForRoute
    };
    return acc;
  }, {});

  return routeResponse;
}

function convertPolylineToCords(polyline) {
  const points = Polyline.decode(polyline);
  const coords = points.map(point => {
    return {
      latitude: point[0],
      longitude: point[1]
    };
  });

  return coords;
}

// get each mode and distance, and call calculateEmissions
export function calcEmissionsForRoute(response) {
  const steps = get(response, "routes[0].legs[0].steps") || [];
  const totalDistance = steps.reduce((total, step) => {
    const travelMode = get(step, "travel_mode");
    if (travelMode) {
      if (!total[travelMode]) {
        total[travelMode] = 0;
      }

      const distanceInMeters = get(step, "distance.value");
      const distanceInKms = distanceInMeters / 1000;
      total[travelMode] += distanceInKms;
    }

    return total;
  }, {});

  return Object.entries(totalDistance).reduce((sum, [mode, distance]) => {
    sum += calculateEmissions(distance, mode);
    return sum;
  }, 0);
}
