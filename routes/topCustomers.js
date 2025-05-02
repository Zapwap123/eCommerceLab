const express = require("express");
const db = require("../config/db");
const router = express.Router();

// This route retrieves the top customers based on total spending and excludes cancelled orders
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
        SELECT  c.customer_id,
                c.name,
                c.email,
                c.country,
                SUM(oi.quantity * oi.unit_price) AS total_spending
        FROM
            customers c
        JOIN
            orders o ON c.customer_id = o.customer_id
        JOIN
            order_items oi ON o.order_id = oi.order_id
        WHERE
            o.status != 'Cancelled'  -- Exclude cancelled orders
        GROUP BY
            c.customer_id
        ORDER BY
            total_spending DESC;
`);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
