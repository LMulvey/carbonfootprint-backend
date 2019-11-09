import { calculateEmissions } from "../src/lib/carbonHelpers";
import {
  validateTransportType,
  TRANSPORT_TYPES
} from "../src/lib/transportHelpers";
import { titleCase } from "../src/lib/genericHelpers";

describe("carbonHelpers", () => {
  test("calculateEmissions | Properly outputs emissions given a valid transport type and distance in KMs", () => {
    const expectedEmissions = 3.3161;
    const inputDistance = 16.0976;
    const emissions = calculateEmissions(inputDistance);
    expect(emissions).toEqual(expectedEmissions);
  });

  test("calculateEmissions | Throws an error when given an invalid transportType", () => {
    const expectedError = /Invalid transport type/;
    const inputDistance = 16.0976;
    const emissions = () => calculateEmissions(inputDistance, "FAKE_TRANSPORT");
    expect(emissions).toThrowError(expectedError);
  });

  test("calculateEmissions | Returns 0 when distance is equal to 0", () => {
    const expectedEmissions = 0;
    const inputDistance = 0;
    const emissions = calculateEmissions(inputDistance);
    expect(emissions).toEqual(expectedEmissions);
  });

  test("calculateEmissions | Returns 0 when distance is less-than 0", () => {
    const expectedEmissions = 0;
    const inputDistance = -200030;
    const emissions = calculateEmissions(inputDistance);
    expect(emissions).toEqual(expectedEmissions);
  });
});

describe("transportHelpers", () => {
  test("transportHelpers | Returns input transportType if it is valid", () => {
    const transportType = TRANSPORT_TYPES.TRANSIT;
    const validated = validateTransportType(transportType);
    expect(validated).toEqual(transportType);
  });

  test("transportHelpers | Throws an error if transport is invalid", () => {
    const expectedError = /Invalid transport type/;
    const validated = () => validateTransportType("FAKE_TRANSPORT");
    expect(validated).toThrowError(expectedError);
  });
});

describe("genericHelpers", () => {
  test("titleCase | Converts a string to titleCase", () => {
    const expectedOutput = "Hello";
    const input = "HELLO";
    const converted = titleCase(input);
    expect(converted).toEqual(expectedOutput);
  });

  test("titleCase | Throws if a string is not passed in", () => {
    const converted = () => titleCase(-9399);
    expect(converted).toThrow();
  });
});
