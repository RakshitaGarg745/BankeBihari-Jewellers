const supplierModel = require("../models/supplierModel");

// ================= GET ALL =================

exports.getAllSuppliers = async(req,res)=>{

    try{

        const suppliers =
            await supplierModel.getAllSuppliers();

        res.json(suppliers);

    }catch(err){

        console.log(err);

        res.status(500).json({
            message:"Unable To Fetch Suppliers"
        });

    }

};

// ================= ADD =================

exports.addSupplier = async(req,res)=>{

    try{

        const id =
            await supplierModel.addSupplier(req.body);

        res.json({

            success:true,

            supplier_id:id,

            message:"Supplier Added Successfully"

        });

    }catch(err){

        console.log(err);

        res.status(500).json({

            success:false,

            message:"Unable To Add Supplier"

        });

    }

};

// ================= GET ONE =================

exports.getSupplierById = async(req,res)=>{

    try{

        const supplier =
            await supplierModel.getSupplierById(
                req.params.id
            );

        res.json(supplier);

    }catch(err){

        console.log(err);

        res.status(500).json({

            message:"Unable To Fetch Supplier"

        });

    }

};

// ================= UPDATE =================

exports.updateSupplier = async(req,res)=>{

    try{

        await supplierModel.updateSupplier(

            req.params.id,

            req.body

        );

        res.json({

            success:true,

            message:"Supplier Updated Successfully"

        });

    }catch(err){

        console.log(err);

        res.status(500).json({

            message:"Unable To Update Supplier"

        });

    }

};

// ================= DELETE =================

exports.deleteSupplier = async(req,res)=>{

    try{

        await supplierModel.deleteSupplier(

            req.params.id

        );

        res.json({

            success:true,

            message:"Supplier Deleted Successfully"

        });

    }catch(err){

        console.log(err);

        res.status(500).json({

            message:"Unable To Delete Supplier"

        });

    }

};