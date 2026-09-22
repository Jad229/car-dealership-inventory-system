import express, { json } from "express"
import cors from "cors"
import { createVehicle, getVehicles } from './routes/vehicles.js';

const app = express();

app.use(express.json())
app.use(cors());

app.get("/api/vehicles", getVehicles)
app.post("/api/vehicles", createVehicle)

export default app;