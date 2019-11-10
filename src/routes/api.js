import Express from "express";
import { calculateEmissions } from "../lib/carbonHelpers";
import { validateOriginAndDestInput, validateDistance } from "../middleware";
import { totalEmissionsForRoute, getDirections } from "../lib/googleMapsApi";
const router = Express.Router();

router.get("/emissions", validateDistance, (req, res) => {
  // This takes a distance for now but can be changed out.
  const { distance, transportType } = req.query;
  const parsedDistance = parseFloat(distance);
  const carbonEmissions = calculateEmissions(parsedDistance, transportType);
  res.json({ carbonEmissions });
});

router.post(
  "/routeAndEmissions",
  validateOriginAndDestInput,
  async (req, res) => {
    const { origin, destination } = req.body;
    const directions = await getDirections(origin, destination);
    const emissions = totalEmissionsForRoute(directions);
    res.json({ totalEmissions: emissions });
  }
);

export default router;
