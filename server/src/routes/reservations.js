import { query } from "../db/index.js";

export const createReservation = async (req, res) => {
  const { customer_id, vehicle_id, reservation_date, status } = req.body;

  try {
    // Check if the vehicle is already reserved
    const checkReservationSql = `SELECT * FROM reservations WHERE vehicle_id = $1`;
    const checkReservationResult = await query(checkReservationSql, [
      vehicle_id,
    ]);
    if (checkReservationResult.rows.length > 0) {
      return res.status(400).json({ message: "Vehicle is already reserved" });
    }

    // Check if the vehicle is available
    const checkAvailabilitySql = `SELECT * FROM vehicles WHERE vehicle_id = $1 AND status = 'available'`;
    const checkAvailabilityResult = await query(checkAvailabilitySql, [
      vehicle_id,
    ]);
    if (checkAvailabilityResult.rows.length === 0) {
      return res.status(400).json({ message: "Vehicle is not available" });
    }

    // Set the vehicle status to reserved
    const setReservedSql = `UPDATE vehicles SET status = 'reserved' WHERE vehicle_id = $1`;
    await query(setReservedSql, [vehicle_id]);

    // Create the reservation
    const createReservationSql = `INSERT INTO reservations (customer_id, vehicle_id, reservation_date, status, notes) VALUES ($1, $2, $3, $4, $5) RETURNING reservation_id, customer_id, vehicle_id, reservation_date, status, notes`;
    const reservationResult = await query(createReservationSql, [
      customer_id,
      vehicle_id,
      reservation_date,
      status,
    ]);
    res.status(201).json(reservationResult.rows);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Could not create reservation", error });
  }
};

export const cancelReservation = async (req, res) => {
  const { reservation_id } = req.params;

  try {
    const cancelReservationSql = `UPDATE reservations SET status = 'cancelled' WHERE reservation_id = $1 RETURNING reservation_id, customer_id, vehicle_id, reservation_date, status`;
    const reservationResult = await query(cancelReservationSql, [
      reservation_id,
    ]);

    // set the vehicle status to available
    const setAvailabilitySql = `UPDATE vehicles SET status = 'available' WHERE vehicle_id = $1`;
    await query(setAvailabilitySql, [reservationResult.rows[0].vehicle_id]);

    res.status(200).json(reservationResult.rows);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Could not cancel reservation", error });
  }
};

export const getReservations = async (req, res) => {
  try {
    const sql = `SELECT c.name, r.vehicle_id, r.reservation_date, r.status FROM reservations AS r
    JOIN customers AS c ON r.customer_id = c.customer_id`;
    const reservations = await query(sql);
    res.status(200).json(reservations.rows);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Could not get reservations", error });
  }
};
