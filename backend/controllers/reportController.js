const reportModel = require("../models/reportModel");

// ================= SALES REPORT =================

const salesReport = async (req, res) => {

    try {

        const summary =
            await reportModel.getSalesReport();

        const topProducts =
            await reportModel.getTopProducts();

        res.json({

            summary,

            topProducts

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Unable To Fetch Report"

        });

    }

};

module.exports = {

    salesReport

};