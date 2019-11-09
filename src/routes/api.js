import Express from 'express';
import { calculateVehicleEmissions } from '../lib/carbonHelpers';
const router = Express.Router();

router.post('/footprint', (req, res) => {
  // This takes a distance for now but can be changed out.
  const distance = req.body.distance;
  const parsedDistance = parseFloat(distance);
  const carbonEmissions = calculateVehicleEmissions(parsedDistance);
  res.json({ carbonEmissions });
});

export default router;