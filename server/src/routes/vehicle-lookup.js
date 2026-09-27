import { query } from "./../db/index.js";

export const getVehicleByVin = async (req, res) => {
  const { vin } = req.params;

  try {
    const sql = `SELECT make, model, year, mileage, asking_price, color, status FROM vehicles WHERE vin = $1`;
    const vehicleResult = await query(sql, [vin]);

    res.status(200).json(vehicleResult.rows);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Could not fetch vehicle details", error });
  }
};
