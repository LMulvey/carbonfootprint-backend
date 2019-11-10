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

router.get(
  "/routeAndEmissions",
  validateOriginAndDestInput,
  async (req, res) => {
    // const { origin, destination } = req.body;
    // const directions = await getDirections(origin, destination);
    // const emissions = totalEmissionsForRoute(directions);

    const coords = [
      {
        latitude: 51.05144,
        longitude: -114.05049
      },
      {
        latitude: 51.05142,
        longitude: -114.05171
      },
      {
        latitude: 51.05133,
        longitude: -114.0517
      },
      {
        latitude: 51.05099,
        longitude: -114.05167
      },
      {
        latitude: 51.05087,
        longitude: -114.05168
      },
      {
        latitude: 51.05052,
        longitude: -114.05185
      },
      {
        latitude: 51.05045,
        longitude: -114.05189
      },
      {
        latitude: 51.04995,
        longitude: -114.0523
      },
      {
        latitude: 51.04957,
        longitude: -114.05265
      },
      {
        latitude: 51.04942,
        longitude: -114.05279
      },
      {
        latitude: 51.04917,
        longitude: -114.05314
      },
      {
        latitude: 51.04911,
        longitude: -114.05336
      },
      {
        latitude: 51.04905,
        longitude: -114.05375
      },
      {
        latitude: 51.04907,
        longitude: -114.05445
      },
      {
        latitude: 51.04908,
        longitude: -114.05542
      },
      {
        latitude: 51.04872,
        longitude: -114.05544
      },
      {
        latitude: 51.04822,
        longitude: -114.05548
      },
      {
        latitude: 51.04723,
        longitude: -114.0555
      },
      {
        latitude: 51.04623,
        longitude: -114.05558
      },
      {
        latitude: 51.04621,
        longitude: -114.05558
      },
      {
        latitude: 51.04635,
        longitude: -114.05672
      },
      {
        latitude: 51.04638,
        longitude: -114.05807
      },
      {
        latitude: 51.04644,
        longitude: -114.06052
      },
      {
        latitude: 51.04656,
        longitude: -114.06296
      },
      {
        latitude: 51.04659,
        longitude: -114.06444
      },
      {
        latitude: 51.04671,
        longitude: -114.06921
      },
      {
        latitude: 51.04679,
        longitude: -114.07266
      },
      {
        latitude: 51.04682,
        longitude: -114.07381
      },
      {
        latitude: 51.04693,
        longitude: -114.07628
      },
      {
        latitude: 51.04695,
        longitude: -114.07797
      },
      {
        latitude: 51.04708,
        longitude: -114.08295
      },
      {
        latitude: 51.04719,
        longitude: -114.08612
      },
      {
        latitude: 51.04723,
        longitude: -114.08826
      },
      {
        latitude: 51.04719,
        longitude: -114.08877
      },
      {
        latitude: 51.04681,
        longitude: -114.09114
      },
      {
        latitude: 51.04672,
        longitude: -114.09169
      },
      {
        latitude: 51.04666,
        longitude: -114.09191
      },
      {
        latitude: 51.04649,
        longitude: -114.09235
      },
      {
        latitude: 51.04633,
        longitude: -114.09264
      },
      {
        latitude: 51.04607,
        longitude: -114.09304
      },
      {
        latitude: 51.04567,
        longitude: -114.09362
      },
      {
        latitude: 51.04539,
        longitude: -114.09404
      },
      {
        latitude: 51.04514,
        longitude: -114.09452
      },
      {
        latitude: 51.04494,
        longitude: -114.09508
      },
      {
        latitude: 51.0448,
        longitude: -114.09579
      },
      {
        latitude: 51.04475,
        longitude: -114.09636
      },
      {
        latitude: 51.04475,
        longitude: -114.09692
      },
      {
        latitude: 51.04477,
        longitude: -114.09778
      },
      {
        latitude: 51.04483,
        longitude: -114.09978
      },
      {
        latitude: 51.04501,
        longitude: -114.10606
      },
      {
        latitude: 51.04502,
        longitude: -114.10676
      },
      {
        latitude: 51.04498,
        longitude: -114.10736
      },
      {
        latitude: 51.04487,
        longitude: -114.10793
      },
      {
        latitude: 51.04469,
        longitude: -114.10853
      },
      {
        latitude: 51.04401,
        longitude: -114.11
      },
      {
        latitude: 51.04388,
        longitude: -114.11032
      },
      {
        latitude: 51.04344,
        longitude: -114.1115
      },
      {
        latitude: 51.04302,
        longitude: -114.11261
      },
      {
        latitude: 51.04269,
        longitude: -114.11357
      },
      {
        latitude: 51.04243,
        longitude: -114.11438
      },
      {
        latitude: 51.04214,
        longitude: -114.11545
      },
      {
        latitude: 51.04201,
        longitude: -114.11602
      },
      {
        latitude: 51.04188,
        longitude: -114.11677
      },
      {
        latitude: 51.04177,
        longitude: -114.11755
      },
      {
        latitude: 51.0417,
        longitude: -114.11832
      },
      {
        latitude: 51.04165,
        longitude: -114.11917
      },
      {
        latitude: 51.04166,
        longitude: -114.12094
      },
      {
        latitude: 51.0417,
        longitude: -114.12262
      },
      {
        latitude: 51.04171,
        longitude: -114.12423
      },
      {
        latitude: 51.0417,
        longitude: -114.12672
      },
      {
        latitude: 51.04167,
        longitude: -114.12865
      },
      {
        latitude: 51.04165,
        longitude: -114.13108
      },
      {
        latitude: 51.04165,
        longitude: -114.13229
      },
      {
        latitude: 51.04162,
        longitude: -114.13331
      },
      {
        latitude: 51.04153,
        longitude: -114.13465
      },
      {
        latitude: 51.04145,
        longitude: -114.13499
      },
      {
        latitude: 51.04128,
        longitude: -114.13538
      },
      {
        latitude: 51.04127,
        longitude: -114.13553
      },
      {
        latitude: 51.04122,
        longitude: -114.13562
      },
      {
        latitude: 51.04098,
        longitude: -114.13588
      },
      {
        latitude: 51.04079,
        longitude: -114.13609
      },
      {
        latitude: 51.04047,
        longitude: -114.1363
      },
      {
        latitude: 51.04055,
        longitude: -114.1366
      },
      {
        latitude: 51.04055,
        longitude: -114.13669
      },
      {
        latitude: 51.04073,
        longitude: -114.13668
      },
      {
        latitude: 51.04073,
        longitude: -114.13613
      },
      {
        latitude: 51.04073,
        longitude: -114.13545
      },
      {
        latitude: 51.04083,
        longitude: -114.13545
      }
    ];
    res.json({ coords: coords });
  }
);

export default router;
