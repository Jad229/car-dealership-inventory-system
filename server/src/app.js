import express from "express"
import cors from "cors"
import { query } from './db/index.js';

const app = express();

app.use(cors());

app.get("/api/vehicles", async (req, res) => {
    try {
        const vehiclesResult = await query(`SELECT * FROM vehicles`)
        res.status(200).json(vehiclesResult.rows)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Could not fetch vehicles" });
    }
})

export default app;