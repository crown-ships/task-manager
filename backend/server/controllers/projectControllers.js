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
   ownerName: req.body.ownerName,
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
     const { errors, isValid } = validateProjectName(userBody);
     // Check validation
     if (!isValid) {
       return res.status(400).json(errors);
     }
   }

   await Project.findByIdAndUpdate(id_upd, userBody);
   const user = await Project.findById(id_upd);

   res.status(200).json({
    data: user,
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
