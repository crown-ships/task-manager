const Payment = require('../../models/paymentModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const mongoose = require ('mongoose');
const validatePaymentInput = require("../../validation/payment/addNew");
const validatePaymentName = require("../../validation/payment/validatePaymentName");
const validatePaymentAmount = require("../../validation/payment/validatePaymentAmount");
const validateDate = require("../../validation/validateDate");

exports.addNew = async (req, res, next) => {
 try {
   // Validation code here
   const { errors, isValid } = validatePaymentInput(req.body);
   // Check validation
   if (!isValid) {
     return res.status(400).json(errors);
   }

  const signedupPayment = new Payment({
   vendorName: req.body.vendorName,
   vendorID: req.body.vendorID,
   vendorStartDate: req.body.vendorStartDate,
   vendorEndDate: req.body.vendorEndDate,
   vendorCrtAmt: req.body.vendorCrtAmt,
   paymentName: req.body.paymentName,
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
   if (userBody.paymentName)
   {
     const { errors, isValid } = validatePaymentName(userBody);
     // Check validation
     if (!isValid) {
       return res.status(400).json(errors);
     }
   }

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
