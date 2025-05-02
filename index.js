require("dotenv").config();
const express = require("express");

const topCustomerRoute = require("./routes/topCustomers");
const monthlySalesReportRoute = require("./routes/monthlySalesReport");
const productsNeverOrderedRoute = require("./routes/productsNeverOrdered");
const countryAverageOrderValueRoute = require("./routes/countryAverageOrderValue");
const frequentBuyersRoute = require("./routes/frequentBuyers");

const app = express();
const port = process.env.PORT || 3000;

// The routes to access the API endpoints
app.use("/api/topCustomer", topCustomerRoute);
app.use("/api/monthlySalesReport", monthlySalesReportRoute);
app.use("/api/productsNeverOrdered", productsNeverOrderedRoute);
app.use("/api/countryAverageOrderValue", countryAverageOrderValueRoute);
app.use("/api/frequentBuyers", frequentBuyersRoute);

app.get("/", (req, res) => {
  res.send("Ecommerce API is live");
});

app.listen(port, () => console.log(`API running at http://localhost:${port}`));
