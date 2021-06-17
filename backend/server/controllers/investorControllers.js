const Investor = require('../../models/investorModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const mongoose = require ('mongoose');
const validateInvestorInput = require("../../validation/investor/addNew");
const validateContactNo = require("../../validation/investor/validateContactNo")
const validateInvestorName = require("../../validation/investor/validateInvestorName");
const validateEmail = require("../../validation/investor/validateEmail");
const { roles } = require('../roles')

exports.addNew = async (req, res, next) => {
 try {

   const { errors, isValid } = validateInvestorInput(req.body);
   // Check validation
   if (!isValid) {
     return res.status(400).json(errors);
   }

  const name = req.body.investorName;
  const user = await Investor.findOne({ name });
  if (user) return res.status(400).json({data: "Investor already exists."});

  const signedupInvestor = new Investor({
   investorName: req.body.investorName,
   investorEmail: req.body.investorEmail,
   contactNo: req.body.contactNo,
   creatorName: req.body.creatorName,
   creatorID: req.body.creatorID,
   approved: req.body.approved
  });

  await signedupInvestor.save()
  res.status(200).json({message:"Investor created."})
}
catch(error) {
   next(error)
 }
}

exports.getInvestors = async (req, res, next) => {
  const investors = await Investor.find({});
  res.status(200).json({
    data: investors
  });
}

 //validate role
exports.update = async (req, res, next) => {
 try {
   const id_upd = req.query.investorID;

   const userBody = req.body;

   if (userBody.investorName)
   {
     const { errors, isValid } = validateInvestorName(userBody);
     // Check validation
     if (!isValid) {
       return res.status(400).json(errors);
     }
   }

   if (userBody.contactNo)
   {
     const { errors, isValid } = validateContactNo(userBody);
     // Check validation
     if (!isValid) {
       return res.status(400).json(errors);
     }
   }

   if (userBody.investorEmail)
   {
     const { errors, isValid } = validateEmail(userBody);
     // Check validation
     if (!isValid) {
       return res.status(400).json(errors);
     }
   }

   await Investor.findByIdAndUpdate(id_upd, userBody);
   const user = await Investor.findById(id_upd);

   res.status(200).json({
    data: user,
      message: 'Investor updated successfully.'
   });
  }
  catch (error) {
   next(error)
  }
}

exports.delete = async (req, res, next) => {
 try {
  const id_del = req.query.investorID;
  await Investor.findByIdAndDelete(id_del);
  res.status(200).json({
   data: null,
   message: 'Investor has been deleted'
  });


 }
 catch (error) {
  next(error)
 }
}
