import { query } from "../db/index.js";

const getDashboardData = async (req, res) => {
  try {
    // Inventory by status casting as int to avoid string being returned by COUNT(*)
    const inventoryByStatusSql = `
      SELECT status, COUNT(*)::int AS count
      FROM vehicles
      GROUP BY status
      ORDER BY status
    `;

    // Sum of all vehicles that are not sold COALESCE is used to handle null values
    const inventoryValueSql = `
      SELECT COALESCE(SUM(asking_price), 0) AS inventory_value
      FROM vehicles
      WHERE status != 'sold'
    `;

    // Sum of all sales
    const salesSql = `
      SELECT
        COALESCE(SUM(sale_price), 0) AS sales_revenue,
        COALESCE(AVG(sale_price), 0) AS average_sale_price
      FROM sales
    `;

    // Most inquired vehicles
    const mostInquiredSql = `
      SELECT
        v.vehicle_id,
        v.year,
        v.make,
        v.model,
        COUNT(i.inquiry_id)::int AS inquiry_count
      FROM vehicles v
      JOIN inquiries i ON i.vehicle_id = v.vehicle_id
      GROUP BY v.vehicle_id, v.year, v.make, v.model
      ORDER BY inquiry_count DESC, v.make, v.model
      LIMIT 5
    `;

    // Execute all queries and return the results
    const [inventoryByStatus, inventoryValue, sales, mostInquired] =
      await Promise.all([
        // Inventory by status
        query(inventoryByStatusSql),
        // Inventory value
        query(inventoryValueSql),
        // Sales
        query(salesSql),
        // Most inquired vehicles
        query(mostInquiredSql),
      ]);

    res.status(200).json({
      inventoryByStatus: inventoryByStatus.rows,
      inventoryValue: inventoryValue.rows[0].inventory_value,
      salesRevenue: sales.rows[0].sales_revenue,
      averageSalePrice: sales.rows[0].average_sale_price,
      mostInquiredVehicles: mostInquired.rows,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Could not get dashboard data", error });
  }
};

export default getDashboardData;
