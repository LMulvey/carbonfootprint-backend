const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBnw3zF19o4g2IABEE7PP4wIeFbuVY6w-A'
});

googleMapsClient.directions({
  origin: 'place_id:ChIJtUiovwJwcVMRBCqAUqr-Ed4',
  destination: 'place_id:ChIJN2IIz_xvcVMRXOZpdWodzrc',
  // mode: 'transit'
}, function(err, response) {
  if (!err) {
    steps = response.json.routes[0].legs[0].steps;
    steps.forEach(step => {
      transportType = step.travel_mode;
      distance = step.distance.value;
      calculateEmissions(distance, transportType)
    });
  }
});
