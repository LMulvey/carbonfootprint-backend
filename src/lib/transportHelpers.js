import { titleCase } from "./genericHelpers";

export const TRANSPORT_TYPES = {
  DRIVING: "DRIVING",
  TRANSIT: "TRANSIT",
  BICYCLING: "BICYCLING",
  WALKING: "WALKING"
};

export function validateTransportType(inputType) {
  if (typeof inputType !== "string") {
    throw new Error("Transport Type should be a string.");
  }

  const lowerCaseType = inputType.toLowerCase();
  const typeCandidate = TRANSPORT_TYPES[lowerCaseType];

  if (!typeCandidate) {
    const prettyTypes = Object.keys(TRANSPORT_TYPES)
      .map(key => titleCase(key))
      .join(", ");
    throw new Error(
      `Invalid transport type. Transport should be one of the following: ${prettyTypes}`
    );
  }

  return typeCandidate;
}
