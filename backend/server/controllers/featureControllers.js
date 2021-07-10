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

  const signedupFeature = new Feature({
   featureName: req.body.featureName,
   projectName: req.body.projectName,
   projectID: req.body.projectID,
   featureDetails: req.body.featureDetails,
   startDate: req.body.startDate,
   dueDate: req.body.dueDate,
   companyName: req.body.companyName,
   companyID: req.body.companyID,
   creatorName: req.body.creatorName,
   creatorID: req.body.creatorID,
   ownerName:req.body.ownerName,
   assignee:req.body.assignee
  });

  await signedupFeature.save()
  res.status(200).json({message:"Feature Added."})
}
catch(error) {
   next(error)
 }
}

exports.updateAll = async (req, res, next) => {
try {
  const projectID = req.query.projectID;
  const companyID = req.query.companyID;
  const userBody = req.body;


  await Feature.updateMany({$or:[{projectID: projectID}, {companyID: companyID}]}, userBody);

   res.status(200).json({
    message: 'Features enabled/disabled'
   });
  }
  catch (error) {
   next(error)
  }
}

exports.getFeatures = async (req, res, next) => {
  const features = await Feature.find({});
  res.status(200).json({
    data: features
  });
}

exports.getFilteredFeatures = async (req, res, next) => {
  const search = {
    featureName: req.query.featureName,
    dueDate: req.query.dueDate,
    startDate: req.query.startDate,
    featureDetails: req.query.featureDetails,
    projectName: req.query.projectName,
    projectID: req.query.projectID,
    companyName: req.query.companyName,
    companyID: req.query.companyID,
    creatorName: req.query.creatorName,
    creatorID: req.query.creatorID,
    enabled: req.query.enabled,
    ownerName: req.query.ownerName,
    assignee: req.query.assignee
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
  var features;
  if(conditions.length == 0){
     features = await Feature.find({});
  }
  else {
     features = await Feature.find({$and: conditions});
  }

  res.status(200).json({
    data: features
  });
}

 //validate role
exports.update = async (req, res, next) => {
 try {
   const id_upd = req.query.featureID;

   const userBody = req.body;

   // if (userBody.dueDate)
   // {
   //   const { errors, isValid } = validateDate(userBody);
   //   // Check validation
   //   if (!isValid) {
   //     return res.status(400).json(errors);
   //   }
   // }
   if (userBody.featureName)
   {
     const { errors, isValid } = validateFeatureName(userBody);
     // Check validation
     if (!isValid) {
       return res.status(400).json(errors);
     }
   }

   await Feature.findByIdAndUpdate(id_upd, userBody);
   const user = await Feature.findById(id_upd);

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
  const id_del = req.query.featureID;

  await Feature.findByIdAndDelete(id_del);
  res.status(200).json({
   data: null,
   message: 'Feature has been deleted'
  });


 }
 catch (error) {
  next(error)
 }
}
