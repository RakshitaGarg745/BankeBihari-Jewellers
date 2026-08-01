const purchaseModel = require("../models/purchaseModel");

// ================= GET ALL PURCHASES =================

exports.getAllPurchases = async (req, res) => {

    try {

        const purchases =
            await purchaseModel.getAllPurchases();

        res.json(purchases);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Unable To Fetch Purchases"
        });

    }

};

// ================= GET PURCHASE DETAILS =================

exports.getPurchaseById = async (req, res) => {

    try {

        const purchase =
            await purchaseModel.getPurchaseById(
                req.params.id
            );

        const items =
            await purchaseModel.getPurchaseItems(
                req.params.id
            );

        res.json({

            purchase,

            items

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: "Unable To Fetch Purchase"

        });

    }

};

// ================= ADD PURCHASE =================

exports.addPurchase = async (req, res) => {

    try {

        const {

            supplier_id,
            purchase_date,
            total_amount,
            payment_status,
            amount_paid,
            amount_due,
            remarks,
            items

        } = req.body;

        // Create Purchase

        const purchaseId =
            await purchaseModel.addPurchase({

                supplier_id,
                purchase_date,
                total_amount,
                payment_status,
                amount_paid,
                amount_due,
                remarks

            });

        // Save Purchase Items

        await purchaseModel.addPurchaseItems(

            purchaseId,

            items

        );

        // Increase Product Stock

        await purchaseModel.updateStock(

            items

        );

        res.json({

            success: true,

            message: "Purchase Saved Successfully",

            purchaseId

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: "Unable To Save Purchase"

        });

    }

};

// ================= DELETE PURCHASE =================

exports.deletePurchase = async (req, res) => {

    try {

        await purchaseModel.deletePurchase(
            req.params.id
        );

        res.json({

            success: true,

            message: "Purchase Deleted Successfully"

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: "Unable To Delete Purchase"

        });

    }

};