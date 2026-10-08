import { query } from "../db/index.js";

export const createInquiry = async (req, res) => {
  const { customer_id, vehicle_id, inquiry_date, status, notes } = req.body;

  try {
    const sql = `INSERT INTO inquiries (customer_id, vehicle_id, inquiry_date, status, notes) VALUES ($1, $2, $3, $4, $5) RETURNING inquiry_id, customer_id, vehicle_id, inquiry_date, status, notes`;
    const inquiryResult = await query(sql, [
      customer_id,
      vehicle_id,
      inquiry_date,
      status,
      notes,
    ]);
    res.status(201).json(inquiryResult.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Could not create inquiry", error });
  }
};

export const getInquiries = async (req, res) => {
  try {
    const sql = `SELECT c.name, i.vehicle_id, i.inquiry_date, i.status, i.notes FROM inquiries AS i
    JOIN customers AS c ON i.customer_id = c.customer_id`;
    const inquiries = await query(sql);
    res.status(200).json(inquiries.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Could not get inquiries", error });
  }
};
