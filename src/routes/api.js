import Express from "express";
import { calculateEmissions } from "../lib/carbonHelpers";
import { validateRouteInput, validateDistance } from "../middleware";
import { getRoutesForAllTypes } from "../lib/googleMapsApi";
const router = Express.Router();

router.get("/emissions", validateDistance, (req, res) => {
  // This takes a distance for now but can be changed out.
  const { distance, transportType } = req.query;
  const parsedDistance = parseFloat(distance);
  const carbonEmissions = calculateEmissions(parsedDistance, transportType);
  res.json({ carbonEmissions });
});

router.get("/routeAndEmissions", validateRouteInput, async (req, res) => {
  try {
    const { origin, destination } = req.query;
    const emissions = await getRoutesForAllTypes(origin, destination);
    res.json(emissions);
  } catch (e) {
    throw Error(e);
  }
});

export default router;
