import { calculateEmissions } from "./carbonHelpers";

export function getDirections(origin, destination, mode) {
  const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyBnw3zF19o4g2IABEE7PP4wIeFbuVY6w-A'
  });

  googleMapsClient.directions({
    origin: 'place_id:ChIJtUiovwJwcVMRBCqAUqr-Ed4',
    destination: 'place_id:ChIJN2IIz_xvcVMRXOZpdWodzrc',
    // mode: 'transit'
  }, function(err, response) {
    if (!err) { parseResponse(response); }
  });
}

// get each mode and distance, and call calculateEmissions
function parseResponse(response) {
  var steps = response.json.routes[0].legs[0].steps;
  steps.forEach(step => {
    var result = calculateEmissions(step.distance.value, step.travel_mode);
    console.log(result);
  })
}

getDirections();
