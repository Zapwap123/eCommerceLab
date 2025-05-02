const express = require("express");
const db = require("../config/db");
const router = express.Router();

// This route retrieves the monthly sales report
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
SELECT
    DATE_FORMAT(o.order_date, '%Y-%m') AS month,
    SUM(oi.quantity * oi.unit_price) AS Monthly_sales
FROM
    orders o
JOIN
    order_items oi ON o.order_id = oi.order_id
WHERE
    o.status IN ('Shipped', 'Delivered')  -- Include only shipped or delivered orders
GROUP BY
    DATE_FORMAT(o.order_date, '%Y-%m')
ORDER BY
    month;
`);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
