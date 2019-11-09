import {
  getDirections,
  totalEmissionsForRoute
} from "../src/lib/googleMapsApi";

describe("GoogleMaps", () => {
  test("totalEmissionsForRoute | Returns totalEmissions for a route in g/CO2", async () => {
    const origin = "place_id:ChIJtUiovwJwcVMRBCqAUqr-Ed4";
    const destination = "place_id:ChIJN2IIz_xvcVMRXOZpdWodzrc";
    const expectedEmissions = 485.748;
    const directions = await getDirections(origin, destination);
    const totalEmissions = totalEmissionsForRoute(directions);
    expect(totalEmissions).toEqual(expectedEmissions);
  });
});
