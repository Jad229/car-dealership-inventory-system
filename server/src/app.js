import express from "express";
import cors from "cors";
import {
  createVehicle,
  getVehicleDetails,
  getVehicles,
  updateVehicle,
  deleteVehicle,
} from "./routes/vehicles.js";
import { getVehicleByVin } from "./routes/vehicle-lookup.js";
import { createCustomer } from "./routes/customers.js";
import { createStaff } from "./routes/staff.js";
import { createInquiry } from "./routes/inquiries.js";
import { createReservation, cancelReservation } from "./routes/reservations.js";
import { createSale, getSales } from "./routes/sales.js";

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

// Staff routes
app.post("/api/staff", createStaff);

// Inquiries routes
app.post("/api/inquiries", createInquiry);
/* add get request for inquiries */

// Reservations routes
app.post("/api/reservations", createReservation);
app.put("/api/reservations/:reservation_id", cancelReservation);

// Sales routes
app.post("/api/sales", createSale);
app.get("/api/sales", getSales);

export default app;
