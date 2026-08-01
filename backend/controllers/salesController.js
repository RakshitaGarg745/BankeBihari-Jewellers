const Sales = require("../models/salesModel");

// ================= GET SALES =================

exports.getAllSales = async (req, res) => {

    try {

        const sales = await Sales.getAllSales();

        res.json(sales);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Unable To Fetch Sales"
        });

    }

};

// ================= CREATE SALE =================

exports.createSale = async (req, res) => {

    try {

        const {

            customer_id,
            sale_date,
            total_amount,
            amount_paid,
            amount_left,
            sale_type,
            items

        } = req.body;

        const saleId = await Sales.createSale({

            customer_id,
            sale_date,
            total_amount,
            amount_paid,
            amount_left,
            sale_type

        });

        await Sales.addSaleItems(saleId, items);

        await Sales.reduceStock(items);

        res.json({

            success: true,
            message: "Sale Added Successfully"

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,
            message: "Unable To Add Sale"

        });

    }

};

// ================= DETAILS =================

exports.getSaleById = async (req, res) => {

    try {

        const sale = await Sales.getSaleById(req.params.id);

        const items = await Sales.getSaleItems(req.params.id);

        res.json({

            sale,
            items

        });

    } catch (err) {

        console.log(err);

    }

};

// ================= DELETE =================

exports.deleteSale = async (req, res) => {

    try {

        await Sales.deleteSale(req.params.id);

        res.json({

            success: true

        });

    } catch (err) {

        console.log(err);

    }

};

// ================= CUSTOMERS =================

exports.getCustomers = async (req, res) => {

    const db = require("../config/db");

    const [rows] = await db.query(

        "SELECT customer_id,full_name FROM Customers"

    );

    res.json(rows);

};

// ================= PRODUCTS =================

exports.getProducts = async (req, res) => {

    const db = require("../config/db");

    const [rows] = await db.query(

        `SELECT
            product_id,
            product_name,
            price,
            stock
        FROM Products
        WHERE stock>0`

    );

    res.json(rows);

};