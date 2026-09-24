import express, { json } from "express"
import cors from "cors"
import { createVehicle, getVehicleDetails, getVehicles, updateVehicle } from './routes/vehicles.js';

const app = express();

app.use(express.json())
app.use(cors());

app.get("/api/vehicles", getVehicles)
app.post("/api/vehicles", createVehicle)
app.get("/api/vehicles/:vehicleId", getVehicleDetails)
app.patch("/api/vehicles/:vehicleId", updateVehicle)

export default app;