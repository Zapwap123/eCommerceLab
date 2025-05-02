const express = require("express");
const db = require("../config/db");
const router = express.Router();

// This route calculates the average order value for each country
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
SELECT
    c.country,
    AVG(order_total.total_amount) AS average_order_value
FROM
    (
        SELECT
            o.order_id,
            o.customer_id,
            SUM(oi.quantity * oi.unit_price) AS total_amount
        FROM
            orders o
        JOIN
            order_items oi ON o.order_id = oi.order_id
        WHERE
            o.status IN ('Shipped', 'Delivered')  -- To check for only orders that were shipped or delivered
        GROUP BY
            o.order_id, o.customer_id
    ) AS order_total
JOIN
    customers c ON order_total.customer_id = c.customer_id
GROUP BY
    c.country
ORDER BY
    average_order_value DESC;
`);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
