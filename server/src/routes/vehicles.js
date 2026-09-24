import { query } from './../db/index.js';

export const getVehicles = async (req, res) => {
    try {
        // Destructure query params
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


        const vehiclesResult = await query(sql, params)
        res.status(200).json(vehiclesResult.rows)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Could not fetch vehicles", error });
    }
}

export const createVehicle = async (req, res) => {
    try {
        const { vin, make, model, year, mileage, asking_price, purchase_cost, color, status = "available" } = req.body

        // building sql query with parameterized values
        const sql = `
                INSERT INTO vehicles 
                    (vin, make, model, year, mileage, asking_price, purchase_cost, color, status)
                VALUES
                    ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                RETURNING vehicle_id, make, model
                `;

        const values = [vin, make, model, year, mileage, asking_price, purchase_cost, color, status]

        const vehicleResult = await query(sql, values)
        res.status(201).json(vehicleResult.rows)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Could not create vehicle", error });
    }
}

export const getVehicleDetails = async (req, res) => {
    const { vehicleId } = req.params

    try {
        const sql = `SELECT * FROM vehicles WHERE vehicle_id = $1`
        const vehicleResult = await query(sql, [vehicleId])

        res.status(200).json(vehicleResult.rows)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Could not fetch vehicle details", error })
    }
}

export const updateVehicle = async (req, res) => {
    const { vehicleId } = req.params
    const updates = req.body // e.g {make = "Ford", model = "mustang", color = "red"}

    // A filter to prevent any columns that don't have a value getting passed into my query
    //  e.g {make = "Ford", model = undefined, color = "red", asking_price = null} model won't make it past.
    // i.e [make, color] would be the final result
    const columnsToUpdate = Object.keys(updates).filter(key => updates[key] !== undefined && updates[key] !== "");

    // Handle empty request bodies after checking if they are not undefined
    if (columnsToUpdate.length === 0) {
        return res.status(400).json({ error: "No fields provided for update" });
    }

    // Build our SET clause map every column to 'make = $1, model = $2
    const setClause = columnsToUpdate.map((col, index) => `${col} = $${index + 1}`).join(', ')

    // Get the values for the parameterized values.
    const valuesToUpdate = columnsToUpdate.map(col => updates[col])

    // Add the id to parameterized values as last value for my WHERE clause
    valuesToUpdate.push(vehicleId)

    const sql = `
    UPDATE vehicles
    SET ${setClause}
    WHERE vehicle_id = $${valuesToUpdate.length}
    RETURNING *`
    try {
        const vehicleResult = await query(sql, valuesToUpdate)
        res.status(200).json(vehicleResult.rows)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Could not update vehicle details", error })
    }

}