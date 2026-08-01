const express = require("express");
const router = express.Router();
console.log("Admin Routes Loaded");
const adminController = require("../controllers/adminController");


router.post("/login", adminController.login);

module.exports = router;