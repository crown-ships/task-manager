const Feature = require('../../models/featureModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const mongoose = require ('mongoose');
const validateFeatureInput = require("../../validation/feature/addNew");
const validateFeatureName = require("../../validation/feature/validateFeatureName");
const validateDate = require("../../validation/validateDate");

exports.addNew = async (req, res, next) => {
 try {
   // Validation code here
   const { errors, isValid } = validateFeatureInput(req.body);
   // Check validation
   if (!isValid) {
     return res.status(400).json(errors);
   }

   const featureName = req.body.featureName;
   const user = await Feature.findOne({ featureName });
   if (user) return res.status(400).json({data: "Feature already exists."});

  const signedupFeature = new Feature({
   featureName: req.body.featureName,
   projectName: req.body.projectName,
   featureDetails: req.body.featureDetails,
   dueDate: req.body.dueDate,
   creatorName: req.body.creatorName,
   approved:req.body.approved
  });

  await signedupFeature.save()
  res.status(200).json({message:"Feature Added."})
}
catch(error) {
   next(error)
 }
}

exports.getFeatures = async (req, res, next) => {
  const features = await Feature.find({});
  res.status(200).json({
    data: features
  });
}

 //validate role
exports.update = async (req, res, next) => {
 try {
   const featureName_upd = req.query.featureName;

   const feature_upd = await Feature.find({featureName:featureName_upd});

   const userBody = req.body;

   if (userBody.dueDate)
   {
     const { errors, isValid } = validateDate(userBody);
     // Check validation
     if (!isValid) {
       return res.status(400).json(errors);
     }
   }
   if (userBody.featureName)
   {
     const { errors, isValid } = validateFeatureName(userBody);
     // Check validation
     if (!isValid) {
       return res.status(400).json(errors);
     }
   }

   await Feature.findByIdAndUpdate(feature_upd[0]._id, userBody);
   const user = await Feature.findById(feature_upd[0]._id);

   res.status(200).json({
    data: user,
    message: 'Feature updated successfully.'
   });
  }
  catch (error) {
   next(error)
  }
}

exports.delete = async (req, res, next) => {
 try {
  const featureName_del = req.query.featureName;
  const feature_delete = await Feature.find({featureName:featureName_del});

  await Feature.findByIdAndDelete(feature_delete[0]._id);
  res.status(200).json({
   data: null,
   message: 'Feature has been deleted'
  });


 }
 catch (error) {
  next(error)
 }
}
