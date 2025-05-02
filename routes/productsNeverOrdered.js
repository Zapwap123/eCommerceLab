const express = require("express");
const db = require("../config/db");
const router = express.Router();

// This route retrieves products that have never been ordered
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
SELECT
    p.product_id,
    p.name,
    p.category,
    p.price
FROM
    products p
LEFT JOIN
    order_items oi ON p.product_id = oi.product_id
WHERE
    oi.product_id IS NULL;

`);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
