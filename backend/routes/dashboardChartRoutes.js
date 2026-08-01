const express = require("express");

const router = express.Router();

const dashboardController = require("../controllers/dashboardChartController");

router.get(

    "/monthly-sales",

    dashboardController.monthlySales

);

router.get(

    "/monthly-purchases",

    dashboardController.monthlyPurchases

);

router.get(

    "/order-status",

    dashboardController.orderStatus

);

router.get(

    "/low-stock",

    dashboardController.lowStock

);

module.exports = router;