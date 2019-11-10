import { getRoutesForAllTypes } from "../src/lib/googleMapsApi";

describe("GoogleMaps", () => {
  test("totalEmissionsForRoute | Returns totalEmissions for a route in g/CO2", async () => {
    const origin = "place_id:ChIJtUiovwJwcVMRBCqAUqr-Ed4";
    const destination = "place_id:ChIJN2IIz_xvcVMRXOZpdWodzrc";
    const expectedEmissions = 0.4857;
    const totalEmissions = await getRoutesForAllTypes(origin, destination);
    expect(totalEmissions.DRIVING.totalEmissionsForRoute).toEqual(
      expectedEmissions
    );
  });
});
