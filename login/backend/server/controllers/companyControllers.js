const Company = require('../../models/companyModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const mongoose = require ('mongoose');
const validateCompanyInput = require("../../validation/company/addNew");
const validateCompanyName = require("../../validation/company/validateCompanyName");
const validateURL = require("../../validation/company/validateURL");
const validateContactNo = require("../../validation/company/validateContactNo");
const validateEmail = require("../../validation/user/validateEmail");
const { roles } = require('../roles')

exports.addNew = async (req, res, next) => {
 try {
   // Validation code here
   const { errors, isValid } = validateCompanyInput(req.body);
   // Check validation
   if (!isValid) {
     return res.status(400).json(errors);
   }

  const email = req.body.email;
  const user = await Company.findOne({ email });
  if (user) return res.status(400).json({data: "User already exists."});

  const signedupCompany = new Company({
   companyName: req.body.companyName,
   email: req.body.email,
   websiteURL: req.body.websiteURL,
   contactNo: req.body.contactNo,
  });

  await signedupCompany.save()
  res.status(200).json({message:"Company created."})
}
catch(error) {
   next(error)
 }
}

exports.getCompanies = async (req, res, next) => {
  const companies = await Company.find({});
  res.status(200).json({
    data: companies
  });
}

 //validate role
exports.update = async (req, res, next) => {
 try {
   const email_upd = req.query.emailupdate;

   const company_upd = await Company.find({email:email_upd});

   const userBody = req.body;

   if (userBody.email)
   {
     const { errors, isValid } = validateEmail(userBody);
     // Check validation
     if (!isValid) {
       return res.status(400).json(errors);
     }
   }

   if (userBody.companyName)
   {
     const { errors, isValid } = validateCompanyName(userBody);
     // Check validation
     if (!isValid) {
       return res.status(400).json(errors);
     }
   }

   if (userBody.websiteURL)
   {
     const { errors, isValid } = validateURL(userBody);
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
   await Company.findByIdAndUpdate(company_upd[0]._id, userBody);
   const user = await Company.findById(company_upd[0]._id);

   res.status(200).json({
    data: user,
    message: 'User updated successfully.'
   });
  }
  catch (error) {
   next(error)
  }
}

exports.delete = async (req, res, next) => {
 try {
  const email_del = req.query.emailDelete;
  const company_delete = await Company.find({email:email_del});

  await Company.findByIdAndDelete(company_delete[0]._id);
  res.status(200).json({
   data: null,
   message: 'User has been deleted'
  });


 }
 catch (error) {
  next(error)
 }
}
