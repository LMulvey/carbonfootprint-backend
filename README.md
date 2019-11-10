# carbonfootprint-backend
Backend for Carbon Footprint app

## Endpoints
`/api/emissions?distance=<distance>`

**Parameters:**

* `distance` - Distance in kilometers
* `travelType` - one of: driving, transit, walking, bicycling

Returns emissions value in grams CO2/e.