const Dashboard = require("../models/dashboardModel");

exports.getDashboard = async (req,res)=>{

    try{

        const data = await Dashboard.getDashboard();

        res.json(data);

    }

    catch(err){

        console.log(err);

        res.status(500).json({

            message:"Unable To Fetch Dashboard"

        });

    }

};