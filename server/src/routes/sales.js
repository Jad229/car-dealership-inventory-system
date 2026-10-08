import { query } from "../db/index.js";

export const createSale = async (req, res) => {
  const { customer_id, staff_id, vehicle_id, sale_date, sale_price } = req.body;

  try {
    // Check if the vehicle is already sold
    const checkSaleSql = `SELECT * FROM sales WHERE vehicle_id = $1`;
    const checkSaleResult = await query(checkSaleSql, [vehicle_id]);
    if (checkSaleResult.rows.length > 0) {
      return res.status(400).json({ message: "Vehicle is already sold" });
    }

    // Check if the vehicle is available
    const checkAvailabilitySql = `SELECT * FROM vehicles WHERE vehicle_id = $1 AND status = 'available'`;
    const checkAvailabilityResult = await query(checkAvailabilitySql, [
      vehicle_id,
    ]);
    if (checkAvailabilityResult.rows.length === 0) {
      return res.status(400).json({ message: "Vehicle is not available" });
    }

    // Create the sale
    const createSaleSql = `INSERT INTO sales (customer_id, staff_id, vehicle_id, sale_date, sale_price) VALUES ($1, $2, $3, $4, $5) RETURNING sale_id, customer_id, staff_id, vehicle_id, sale_date, sale_price`;
    const saleResult = await query(createSaleSql, [
      customer_id,
      staff_id,
      vehicle_id,
      sale_date,
      sale_price,
    ]);

    // Set the vehicle status to sold
    const setSoldSql = `UPDATE vehicles SET status = 'sold' WHERE vehicle_id = $1`;
    await query(setSoldSql, [vehicle_id]);

    res.status(201).json(saleResult.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Could not create sale", error });
  }
};

export const getSales = async (req, res) => {
  try {
    const salesResult =
      await query(`SELECT c.name, s.vehicle_id, s.sale_date, s.sale_price FROM sales AS s
    JOIN customers AS c ON s.customer_id = c.customer_id`);
    res.status(200).json(salesResult.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Could not get sales", error });
  }
};
