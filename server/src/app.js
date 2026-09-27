import express, { json } from "express";
import cors from "cors";
import {
  createVehicle,
  getVehicleDetails,
  getVehicles,
  updateVehicle,
  deleteVehicle,
} from "./routes/vehicles.js";
import { getVehicleByVin } from "./routes/vehicle-lookup.js";

const app = express();

app.use(express.json());
app.use(cors());

// Vehicles routes
app.get("/api/vehicles", getVehicles);
app.post("/api/vehicles", createVehicle);
app.get("/api/vehicles/:vehicleId", getVehicleDetails);
app.patch("/api/vehicles/:vehicleId", updateVehicle);
app.delete("/api/vehicles/:vehicleId", deleteVehicle);

// Vehicle lookup routes
app.get("/api/vehicle-lookup/:vin", getVehicleByVin);

// Customers routes
app.post("/api/customers", createCustomer);

export default app;
