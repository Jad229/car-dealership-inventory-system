const getDashboardData = async (req, res) => {
  try {
    // Write SQL aggregations for counts, inventory value, revenue, average sale price, and inquiry ranking.
    // Expose metrics via REST and render them in React.

    const getCountsSql = `
      SELECT COUNT(*) FROM vehicles
      SELECT COUNT(*) FROM customers
      SELECT COUNT(*) FROM sales
      SELECT COUNT(*) FROM reservations
      SELECT COUNT(*) FROM inquiries
    `;
    const countsResult = await query(getCountsSql);
    res.status(200).json(countsResult.rows);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Could not get dashboard data", error });
  }
};

export default getDashboardData;
