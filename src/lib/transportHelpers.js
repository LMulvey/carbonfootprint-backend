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

  const upperCaseType = inputType.toUpperCase();
  const typeCandidate = TRANSPORT_TYPES[upperCaseType];

  if (!typeCandidate) {
    const prettyTypes = Object.keys(TRANSPORT_TYPES).join(", ");
    throw new Error(
      `Invalid transport type. Transport should be one of the following: ${prettyTypes}`
    );
  }

  return typeCandidate;
}
