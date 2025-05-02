require("dotenv");
const express = require("express");
const topCustomerRoute = require("./routes/topCustomers");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use("/api/topCustomer", topCustomerRoute);

app.get("/", (req, res) => {
  res.send("Ecommerce API is live");
});

app.listen(port, () => console.log(`API running at http://localhost:${port}`));
