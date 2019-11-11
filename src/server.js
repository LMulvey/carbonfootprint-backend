import Express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

import apiRoutes from "./routes/api";
import rootRoutes from "./routes/root";

import { handleErrorResponse } from "./middleware";

const PORT = process.env.PORT || 8080;
const app = Express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", apiRoutes);
app.get("/", rootRoutes);
app.use("/", handleErrorResponse);

app.listen(PORT, () => {
  console.log(`🌍 Carbon Footprint API listening on ${PORT}`);
});
