const Return = require('../../models/returnsModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const mongoose = require ('mongoose');
const { roles } = require('../roles')

exports.addNew = async (req, res, next) => {
 try {
  const signedupReturn = new Return({
    companyName: req.body.companyName,
    ownerName: req.body.ownerName,
   investmentName: req.body.investmentName,
   investorName: req.body.investorName,
   investorID: req.body.investorID,
   paymentTerms: req.body.paymentTerms,
   dueDate: req.body.dueDate,
   localDueDate: req.body.localDueDate,
   totalInterestAmt: req.body.totalInterestAmt,
   returnAmt: req.body.returnAmt
  });

  await signedupReturn.save()
  res.status(200).json({message:"return created."})
}
catch(error) {
   next(error)
 }
}

exports.getReturns = async (req, res, next) => {
  const returns = await Return.find({});
  res.status(200).json({
    data: returns
  });
}

exports.delete = async (req, res, next) => {
 try {
  const id_del = req.query.returnID;

  await Return.findByIdAndDelete(id_del);
  res.status(200).json({
   data: null,
   message: 'Return has been deleted'
  });


 }
 catch (error) {
  next(error)
 }
}

exports.update = async (req, res, next) => {
 try {
   const returnID_upd = req.query.returnID;


   const userBody = req.body;

   await Return.findByIdAndUpdate(returnID_upd, userBody);
   const user = await Return.findById(returnID_upd);

   res.status(200).json({
    data: user,
    message: 'Return updated successfully.'
   });
  }
  catch (error) {
   next(error)
  }
}

exports.getFilteredReturns = async (req, res, next) => {
  const search = {
    companyName: req.query.companyName,
    ownerName: req.query.ownerName,
    investmentName: req.query.investmentName,
    investmentID: req.query.investmentID,
    investorName: req.query.investorName,
    investorID: req.query.investorID,
    startDate: req.query.startDate,
    dueDate: req.query.dueDate,
    localDueDate: req.query.localDueDate,
    isPaid: req.query.isPaid,
    profitPercent: req.query.profitPercent,
    capitalAmt: req.query.capitalAmt,
    investmentName: req.query.investmentName,
    investmentType: req.query.investmentType,
    creatorName: req.query.creatorName,
    creatorID: req.query.creatorID,
    paymentTerms: req.query.paymentTerms,
    approved: req.query.approved
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

  var returns;
  if(conditions.length == 0){
     returns = await Return.find({});
  }
  else {
     returns = await Return.find({$and: conditions});
  }

  res.status(200).json({
    data: returns,
    conditions: conditions
  });
}
