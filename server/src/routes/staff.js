import { query } from "../db/index.js";

export const createStaff = async (req, res) => {
  const { name, email } = req.body;

  try {
    const sql = `INSERT INTO staff (name, email) VALUES ($1, $2) RETURNING staff_id, name, email`;
    const staffResult = await query(sql, [name, email]);
    res.status(201).json(staffResult.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Could not create staff", error });
  }
};
