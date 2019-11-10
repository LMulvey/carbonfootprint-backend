/**
 * Express Middleware for validating the presence of origin
 * and destination inputs.
 */
export function validateOriginAndDestInput(req, _, next) {
  const { origin, destination } = req.query;
  if (!origin || !destination) {
    throw new Error(
      "Origin and Destination are required for calculating emissions based on route"
    );
  }

  return next();
}

/**
 * Express Middleware for validating that a distance input is:
 * - a valid float
 * - greater than zero
 */
export function validateDistance(req, _, next) {
  const { distance } = req.query;
  const floatDist = parseFloat(distance);

  if (typeof floatDist !== "number" || !floatDist) {
    throw new Error("Distance should be a number in kilometers");
  }

  if (floatDist < 0) {
    throw new Error("Distance should not be less than zero.");
  }

  return next();
}
