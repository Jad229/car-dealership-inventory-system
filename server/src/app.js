import express from "express"
import cors from "cors"
import { query } from './db/index.js';
import capitalize from './utils/capitalize.js';

const app = express();

app.use(cors());

app.get("/api/vehicles", async (req, res) => {

    const { search, make, model, year, color, sort = "year", order = "DESC" } = req.query

    const filters = []; // holds the where conditions
    const params = []; // holds the parameter index for the query

    if (make) {
        params.push(`%${make}%`) // i.e make = Ford 
        filters.push(`make ILIKE $${params.length}`) // i.e $1, $2
    }
    if (model) {
        params.push(`%${model}%`)
        filters.push(`model ILIKE $${params.length}`)
    }
    if (year) {
        params.push(year)
        filters.push(`year = $${params.length}`)
    }
    if (color) {
        params.push(`%${color}%`)
        filters.push(`color ILIKE $${params.length}`)
    }
    if (search) {
        params.push(`%${search}%`);
        filters.push(`(make ILIKE $${params.length} OR model ILIKE $${params.length} OR vin ILIKE $${params.length})`);
    }

    // if there are filters then join them and create a where clause 
    // WHERE make = $1 AND where model = $2 otherwise keep it empty
    const where = filters.length ? `WHERE ${filters.join(" AND ")}` : "";

    // build the query
    const sql = `SELECT * FROM vehicles ${where} ORDER BY ${sort} ${order}`

    try {
        const vehiclesResult = await query(sql, params)
        res.status(200).json(vehiclesResult.rows)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Could not fetch vehicles" });
    }
})

export default app;