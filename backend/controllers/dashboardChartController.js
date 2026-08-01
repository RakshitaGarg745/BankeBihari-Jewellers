const Dashboard = require("../models/dashboardChartModel");

// ================= SALES =================

exports.monthlySales = async (req, res) => {

    try {

        const data = await Dashboard.getMonthlySales();

        console.log("Monthly Sales:", data);

        res.json(data);

    } catch (err) {

        console.log("Monthly Sales Error:", err);

        res.status(500).json({
            message: "Unable To Fetch Sales"
        });

    }

};

// ================= PURCHASES =================

exports.monthlyPurchases = async(req,res)=>{

    try{

        const data = await Dashboard.getMonthlyPurchases();

        res.json(data);

    }

    catch(err){

        console.log(err);

    }

};

// ================= ORDER STATUS =================

exports.orderStatus = async(req,res)=>{

    try{

        const data = await Dashboard.getOrderStatus();

        res.json(data);

    }

    catch(err){

        console.log(err);

    }

};

// ================= LOW STOCK =================

exports.lowStock = async(req,res)=>{

    try{

        const data = await Dashboard.getLowStock();

        res.json(data);

    }

    catch(err){

        console.log(err);

    }

};