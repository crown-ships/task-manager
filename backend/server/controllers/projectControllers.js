const Project = require('../../models/projectModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const mongoose = require ('mongoose');
const validateProjectInput = require("../../validation/project/addNew");
const validateProjectName = require("../../validation/project/validateProjectName");
const validateOwnerName = require("../../validation/project/validateOwnerName");
const validateDate = require("../../validation/validateDate");

exports.addNew = async (req, res, next) => {
 try {
   // Validation code here
   const { errors, isValid } = validateProjectInput(req.body);
   // Check validation
   if (!isValid) {
     return res.status(400).json(errors);
   }

   const projectName = req.body.projectName;
   const user = await Project.findOne({ projectName });
   if (user) return res.status(400).json({data: "Project already exists."});

  const signedupProject = new Project({
   projectName: req.body.projectName,
   companyName: req.body.companyName,
   companyID: req.body.companyID,
   projectDetails: req.body.projectDetails,
   dueDate: req.body.dueDate,
   startDate: req.body.startDate,
   ownerName: req.body.ownerName,
   assignee:req.body.assignee,
   creatorName: req.body.creatorName,
   creatorID:req.body.creatorID,
   approved:req.body.approved
  });

  await signedupProject.save()
  res.status(200).json({message:"Project Added."})
}
catch(error) {
   next(error)
 }
}

exports.getProjects = async (req, res, next) => {
  const projects = await Project.find({});
  res.status(200).json({
    data: projects
  });
}

exports.getFilteredProjects = async (req, res, next) => {
  const search = {
    projectName: req.query.projectName,
    dueDate: req.query.dueDate,
    startDate: req.query.startDate,
    projectDetails: req.query.projectDetails,
    companyName: req.query.companyName,
    companyID: req.query.companyID,
    creatorName: req.query.creatorName,
    creatorID: req.query.creatorID,
    approved: req.query.approved,
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
     projects = await Project.find({});
  }
  else {
     projects = await Project.find({$and: conditions});
  }

  res.status(200).json({
    data: projects
  });
}

 //validate role
exports.update = async (req, res, next) => {
 try {
   const id_upd = req.query.projectID;
   const userBody = req.body;

   // if (userBody.dueDate)
   // {
   //   const { errors, isValid } = validateDate(userBody);
   //   // Check validation
   //   if (!isValid) {
   //     return res.status(400).json(errors);
   //   }
   // }

   if (userBody.ownerName)
   {
     const { errors, isValid } = validateOwnerName(userBody);
     // Check validation
     if (!isValid) {
       return res.status(400).json(errors);
     }
   }

   await Project.findByIdAndUpdate(id_upd, userBody);

   res.status(200).json({
    message: 'Project updated successfully.'
   });
  }
  catch (error) {
   next(error)
  }
}

exports.updateAll = async (req, res, next) => {
try {
  const companyID_upd = req.query.companyID;

  const userBody = req.body;


  await Project.updateMany({companyID: companyID_upd}, userBody);

   res.status(200).json({
    message: 'Project updated successfully.'
   });
  }
  catch (error) {
   next(error)
  }
}

exports.delete = async (req, res, next) => {
 try {
  const id_del = req.query.projectID;

  await Project.findByIdAndDelete(id_del);
  res.status(200).json({
   data: null,
   message: 'Project has been deleted'
  });


 }
 catch (error) {
  next(error)
 }
}
