const Vendor = require('../../models/vendorModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const mongoose = require ('mongoose');
const validateVendorInput = require("../../validation/vendor/addNew");
const validateVendorName = require("../../validation/vendor/validateVendorName");
const validateDate = require("../../validation/validateDate");

exports.addNew = async (req, res, next) => {
 try {
   // Validation code here
   // const { errors, isValid } = validateVendorInput(req.body);
   // // Check validation
   // if (!isValid) {
   //   return res.status(400).json(errors);
   // }

   const vendorName = req.body.vendorName;
   const user = await Vendor.findOne({ vendorName });
   if (user) return res.status(400).json({data: "Vendor already exists."});

  const signedupVendor = new Vendor({
    companyName: req.body.companyName,
    ownerName: req.body.ownerName,
   vendorName: req.body.vendorName,
   vendorEmail: req.body.vendorEmail,
   contactNo: req.body.contactNo,
   contractAmt: req.body.contractAmt,
   pendingAmt: req.body.pendingAmt,
   startDate: req.body.startDate,
   endDate: req.body.endDate,
   creatorName: req.body.creatorName,
   creatorID: req.body.creatorID,
   approved:req.body.approved
  });

  await signedupVendor.save()
  res.status(200).json({message:"Vendor Added."})
}
catch(error) {
   next(error)
 }
}
// exports.updateAll = async (req, res, next) => {
// try {
//   const projectName_upd = req.query.projectName;
//
//   const userBody = req.body;
//
//
//   await Vendor.updateMany({projectName: projectName_upd}, userBody);
//
//    res.status(200).json({
//     message: 'Vendors enabled/disabled'
//    });
//   }
//   catch (error) {
//    next(error)
//   }
// }

exports.getVendors = async (req, res, next) => {
  const vendors = await Vendor.find({});
  res.status(200).json({
    data: vendors
  });
}

 //validate role
exports.update = async (req, res, next) => {
 try {
   const vendorID = req.query.vendorID;


   const userBody = req.body;

   // if (userBody.startDate)
   // {
   //   const { errors, isValid } = validateDate(userBody);
   //   // Check validation
   //   if (!isValid) {
   //     return res.status(400).json(errors);
   //   }
   // }
   // if (userBody.endDate)
   // {
   //   const { errors, isValid } = validateDate(userBody);
   //   // Check validation
   //   if (!isValid) {
   //     return res.status(400).json(errors);
   //   }
   // }
   if (userBody.vendorName)
   {
     const { errors, isValid } = validateVendorName(userBody);
     // Check validation
     if (!isValid) {
       return res.status(400).json(errors);
     }
   }

   await Vendor.findByIdAndUpdate(vendorID, userBody);
   const user = await Vendor.findById(vendorID);

   res.status(200).json({
    data: user,
    message: 'Vendor updated successfully.'
   });
  }
  catch (error) {
   next(error)
  }
}

exports.delete = async (req, res, next) => {
 try {
  const vendorID = req.query.vendorID;


  await Vendor.findByIdAndDelete(vendorID);
  res.status(200).json({
   data: null,
   message: 'Vendor has been deleted'
  });


 }
 catch (error) {
  next(error)
 }
}

exports.getFilteredVendors = async (req, res, next) => {
  const search = {
    companyName: req.query.companyName,
    ownername: req.query.ownerName,
    vendorName: req.query.vendorName,
    vendorEmail: req.query.vendorEmail,
    contractAmt: req.query.contractAmt,
    endDate: req.query.endDate,
    startDate: req.query.startDate,
    creatorName: req.query.creatorName,
    creatorID: req.query.creatorID,
    approved: req.query.approved,
    enabled: req.query.enabled
  };

   var counter=0;
   var conditions = [];


   Object.entries(search).forEach(([key,value]) => {
     if(value !== "")
     {
       var json = {};
       json[key]= value;
       conditions[counter++] = json;

     }
   });

  var vendors;
  if(conditions.length == 0){
     vendors = await Vendor.find({});
  }
  else {
     vendors = await Vendor.find({$and: conditions});
  }

  res.status(200).json({
    data: vendors,
    conditions: conditions
  });
}

 //validate role
exports.update = async (req, res, next) => {
 try {
   const id_upd = req.query.vendorID;
   const userBody = req.body;

   // if (userBody.dueDate)
   // {
   //   const { errors, isValid } = validateDate(userBody);
   //   // Check validation
   //   if (!isValid) {
   //     return res.status(400).json(errors);
   //   }
   // }


   await Vendor.findByIdAndUpdate(id_upd, userBody);

   res.status(200).json({
    message: 'Vendor updated successfully.'
   });
  }
  catch (error) {
   next(error)
  }
}
