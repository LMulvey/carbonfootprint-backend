import Express from 'express';
const router = Express.Router();

router.post('/footprint', (req, res) => {
  // Likely takes a Lat/Lng
  const body = JSON.stringify(req.body);
  res.send(`Footprint. Received body, ${body}`);
});

export default router;