const Task = require('../../models/taskModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const mongoose = require ('mongoose');
const validateTaskInput = require("../../validation/task/addNew");
const validateTaskName = require("../../validation/task/validateTaskName");
const validateDate = require("../../validation/validateDate");
const validateOwnerName = require("../../validation/task/validateOwnerName");

exports.addNew = async (req, res, next) => {
 try {
   // Validation code here
   const { errors, isValid } = validateTaskInput(req.body);
   // Check validation
   if (!isValid) {
     return res.status(400).json(errors);
   }

  const signedupTask = new Task({
   taskName: req.body.taskName,
   featureName: req.body.featureName,
   featureID: req.body.featureID,
   projectName: req.body.projectName,
   projectID: req.body.projectID,
   companyName: req.body.companyName,
   companyID: req.body.companyID,
   taskDetails: req.body.taskDetails,
   dueDate: req.body.dueDate,
   startDate: req.body.startDate,
   ownerName: req.body.ownerName,
   assignee:req.body.assignee,
   creatorName: req.body.creatorName,
   creatorID:req.body.creatorID
  });

  await signedupTask.save()
  res.status(200).json({message:"Task Added."})
}
catch(error) {
   next(error)
 }
}

exports.getTasks = async (req, res, next) => {
  const tasks = await Task.find({});
  res.status(200).json({
    data: tasks
  });
}

exports.getFilteredFeatures = async (req, res, next) => {
  const search = {
    taskName: req.query.taskName,
    taskDetails: req.query.taskDetails,
    featureName: req.query.featureName,
    featureID: req.query.featureID,
    dueDate: req.query.dueDate,
    startDate: req.query.startDate,
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
  var projects;
  if(conditions.length == 0){
     projects = await Feature.find({});
  }
  else {
     projects = await Feature.find({$and: conditions});
  }

  res.status(200).json({
    data: projects
  });
}

exports.updateAll = async (req, res, next) => {
try {
  const projectID = req.query.projectID;
  const companyID = req.query.companyID;
  const userBody = req.body;


  await Task.updateMany({$or:[{projectID: projectID}, {companyID: companyID}]}, userBody);

   res.status(200).json({
    message: 'Tasks enabled/disabled'
   });
  }
  catch (error) {
   next(error)
  }
}

 //validate role
exports.update = async (req, res, next) => {
 try {
   const id_upd = req.query.taskID;

   const userBody = req.body;

   // if (userBody.dueDate !== 'mm/dd/yyyy')
   // {
   //   const { errors, isValid } = validateDate(userBody);
   //   // Check validation
   //   if (!isValid) {
   //     return res.status(400).json(errors);
   //   }
   // }
   if (userBody.taskName)
   {
     const { errors, isValid } = validateTaskName(userBody);
     // Check validation
     if (!isValid) {
       return res.status(400).json(errors);
     }
   }
   if (userBody.ownerName)
   {
     const { errors, isValid } = validateOwnerName(userBody);
     // Check validation
     if (!isValid) {
       return res.status(400).json(errors);
     }
   }

   await Task.findByIdAndUpdate(id_upd, userBody);
   const user = await Task.findById(id_upd);

   res.status(200).json({
    data: user,
    message: 'Task updated successfully.'
   });
  }
  catch (error) {
   next(error)
  }
}

exports.delete = async (req, res, next) => {
 try {
  const id_del = req.query.taskID;

  await Task.findByIdAndDelete(id_del);
  res.status(200).json({
   data: null,
   message: 'Task has been deleted'
  });


 }
 catch (error) {
  next(error)
 }
}
