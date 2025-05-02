const express = require("express");
const db = require("../config/db");
const router = express.Router();

// This route retrieves customers who have made more than one order
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
SELECT
    c.customer_id,
    c.name,
    c.email,
    c.country,
    COUNT(o.order_id) AS total_orders
FROM
    customers c
JOIN
    orders o ON c.customer_id = o.customer_id
GROUP BY
    c.customer_id, c.name, c.email, c.country
HAVING
    COUNT(o.order_id) > 1
ORDER BY
    total_orders DESC;

`);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
