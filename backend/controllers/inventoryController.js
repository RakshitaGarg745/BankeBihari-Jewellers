const inventoryModel = require("../models/inventoryModel");

// Get All Inventory
const getInventory = async (req, res) => {
    try {
        const result = await inventoryModel.getInventory();
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Unable To Fetch Inventory"
        });
    }
};

// Low Stock
const getLowStock = async (req, res) => {
    try {
        const result = await inventoryModel.getLowStock();
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Unable To Fetch Low Stock"
        });
    }
};

// Out Of Stock
const getOutOfStock = async (req, res) => {
    try {
        const result = await inventoryModel.getOutOfStock();
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Unable To Fetch Out Of Stock"
        });
    }
};

module.exports = {
    getInventory,
    getLowStock,
    getOutOfStock
};

// ================= DASHBOARD =================

const getInventoryStats = async (req,res)=>{

    try{

        const stats =
        await inventoryModel.getInventoryStats();

        res.json(stats);

    }catch(err){

        console.log(err);

        res.status(500).json({

            message:"Unable To Fetch Inventory Stats"

        });

    }

};

module.exports = {

    getInventory,

    getLowStock,

    getOutOfStock,

    getInventoryStats

};