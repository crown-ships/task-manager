const Investment = require('../../models/investmentModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const mongoose = require ('mongoose');
const validateInvestmentInput = require("../../validation/investment/addNew");
const validateInvestmentName = require("../../validation/investment/validateInvestmentName");
const validateDate = require("../../validation/validateDate");
const validateInvestmentCPaid = require("../../validation/investment/validateInvestmentCPaid");

const { roles } = require('../roles')

exports.addNew = async (req, res, next) => {
 try {
   const { errors, isValid } = validateInvestmentInput(req.body);
   // Check validation
   if (!isValid) {
     return res.status(400).json(errors);
   }

  const name = req.body.investorName;
  const user = await Investment.findOne({ name });
  if (user) return res.status(400).json({data: "Investment already exists."});

  const signedupInvestment = new Investment({
   investorName: req.body.investorName,
   investorID: req.body.investorID,
   startDate: req.body.startDate,
   dueDate: req.body.dueDate,
   profitPercent: req.body.profitPercent,
   capitalAmt: req.body.capitalAmt,
   investmentName: req.body.investmentName,
   investmentType: req.body.investmentType,
   creatorName: req.body.creatorName,
   creatorID: req.body.creatorID,
   paymentTerms: req.body.paymentTerms,
   approved: req.body.approved
  });

  await signedupInvestment.save()
  res.status(200).json({message:"Investment created."})
}
catch(error) {
   next(error)
 }
}

exports.getInvestments = async (req, res, next) => {
  const investments = await Investment.find({});
  res.status(200).json({
    data: investments
  });
}

 //validate role
exports.update = async (req, res, next) => {
 try {
   const id_upd = req.query.investmentID;


   const userBody = req.body;

   // if (userBody.dueDate)
   // {
   //   const { errors, isValid } = validateDate(userBody);
   //   // Check validation
   //   if (!isValid) {
   //     return res.status(400).json(errors);
   //   }
   // }

   if (userBody.capitalPaid)
   {
     const { errors, isValid } = validateInvestmentCPaid(userBody);
     // Check validation
     if (!isValid) {
       return res.status(400).json(errors);
     }
   }

   await Investment.findByIdAndUpdate(id_upd, userBody);
   const user = await Investment.findById(id_upd);

   res.status(200).json({
    data: user,
      message: 'Investment updated successfully.'
   });
  }
  catch (error) {
   next(error)
  }
}

exports.delete = async (req, res, next) => {
 try {
  const id_del = req.query.investmentID;
  await Investment.findByIdAndDelete(id_del);
  res.status(200).json({
   data: null,
   message: 'Investment has been deleted'
  });


 }
 catch (error) {
  next(error)
 }
}
