import Express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

import apiRoutes from "./routes/api";

const PORT = process.env.PORT || 8080;
const app = Express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRoutes);
app.get("/", (req, res) => {
  res.send(
    "Please use the API at /api/footprint to grab carbon emissions data"
  );
});

// Error handler
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).json({
      success: false,
      errorMessage: err.message || "An error occurred."
    });
    return;
  }

  return next();
});

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
