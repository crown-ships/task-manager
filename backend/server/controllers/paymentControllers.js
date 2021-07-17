const Payment = require('../../models/paymentModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const mongoose = require ('mongoose');
const validatePaymentInput = require("../../validation/payment/addNew");
const validatePaymentName = require("../../validation/payment/validatePaymentName");
const validatePaymentAmount = require("../../validation/payment/validatePaymentAmount");
const validateDate = require("../../validation/validateDate");


exports.getFilteredPayments = async (req, res, next) => {
  const search = {
    companyName: req.query.companyName,
    ownername: req.query.ownerName,
    vendorName: req.query.vendorName,
    vendorStartDate: req.query.vendorStartDate,
    vendorEndDate: req.query.vendorEndDate,
    vendorCrtAmt: req.query.vendorCrtAmt,
    vendorID: req.query.vendorID,
    amtToBePaid: req.query.amtToBePaid,
    dueDate: req.query.dueDate,
    isPaid: req.query.isPaid,
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

  var payments;
  if(conditions.length == 0){
     payments = await Payment.find({});
  }
  else {
     payments = await Payment.find({$and: conditions});
  }

  res.status(200).json({
    data: payments,
    conditions: conditions
  });
}


exports.addNew = async (req, res, next) => {
 try {
   // Validation code here
   const { errors, isValid } = validatePaymentInput(req.body);
   // Check validation
   if (!isValid) {
     return res.status(400).json(errors);
   }

  const signedupPayment = new Payment({
    companyName: req.body.companyName,
    ownerName: req.body.ownerName,
   vendorName: req.body.vendorName,
   vendorID: req.body.vendorID,
   vendorStartDate: req.body.vendorStartDate,
   vendorEndDate: req.body.vendorEndDate,
   vendorCrtAmt: req.body.vendorCrtAmt,
   amtToBePaid: req.body.amtToBePaid,
   dueDate: req.body.dueDate,
   creatorName: req.body.creatorName,
   creatorID:req.body.creatorID,
   approved:req.body.approved
  });

  await signedupPayment.save()
  res.status(200).json({message:"Payment Request Added."})
}
catch(error) {
   next(error)
 }
}
exports.updateAll = async (req, res, next) => {
try {
  const vendorID_upd = req.query.vendorID;

  const userBody = req.body;


  await Payment.updateMany({vendorID: vendorID_upd}, userBody);

   res.status(200).json({
    message: 'Payments enabled/disabled'
   });
  }
  catch (error) {
   next(error)
  }
}

exports.getPayments = async (req, res, next) => {
  const payments = await Payment.find({});
  res.status(200).json({
    data: payments
  });
}

 //validate role
exports.update = async (req, res, next) => {
 try {
   const paymentID_upd = req.query.paymentID;


   const userBody = req.body;

   // if (userBody.dueDate)
   // {
   //   const { errors, isValid } = validateDate(userBody);
   //   // Check validation
   //   if (!isValid) {
   //     return res.status(400).json(errors);
   //   }
   // }

   if (userBody.amtToBePaid)
   {
     const { errors, isValid } = validatePaymentAmount(userBody);
     // Check validation
     if (!isValid) {
       return res.status(400).json(errors);
     }
   }

   await Payment.findByIdAndUpdate(paymentID_upd, userBody);
   const user = await Payment.findById(paymentID_upd);

   res.status(200).json({
    data: user,
    message: 'Payment updated successfully.'
   });
  }
  catch (error) {
   next(error)
  }
}

exports.delete = async (req, res, next) => {
 try {
  const paymentName_del = req.query.paymentID;

  await Payment.findByIdAndDelete(paymentName_del);
  res.status(200).json({
   data: null,
   message: 'Payment has been deleted'
  });


 }
 catch (error) {
  next(error)
 }
}
