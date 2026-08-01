const express = require("express");

const router = express.Router();

const reportController =
require("../controllers/reportController");

router.get(
    "/sales",
    reportController.salesReport
);

module.exports = router;