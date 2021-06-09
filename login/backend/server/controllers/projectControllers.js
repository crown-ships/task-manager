const Project = require('../../models/projectModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const mongoose = require ('mongoose');
const validateProjectInput = require("../../validation/project/addNew");
const validateProjectName = require("../../validation/project/validateProjectName");
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
   projectDetails: req.body.projectDetails,
   dueDate: req.body.dueDate,
   creatorName: req.body.creatorName,
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
   const projectName_upd = req.query.projectName;

   const project_upd = await Project.find({projectName:projectName_upd});

   const userBody = req.body;

   if (userBody.dueDate)
   {
     const { errors, isValid } = validateDate(userBody);
     // Check validation
     if (!isValid) {
       return res.status(400).json(errors);
     }
   }
   if (userBody.projectName)
   {
     const { errors, isValid } = validateProjectName(userBody);
     // Check validation
     if (!isValid) {
       return res.status(400).json(errors);
     }
   }

   await Project.findByIdAndUpdate(project_upd[0]._id, userBody);
   const user = await Project.findById(project_upd[0]._id);

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
  const companyName_upd = req.query.companyName;

  const userBody = req.body;


  await Project.updateMany({companyName: companyName_upd}, userBody);

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
  const projectName_del = req.query.projectName;
  const project_delete = await Project.find({projectName:projectName_del});

  await Project.findByIdAndDelete(project_delete[0]._id);
  res.status(200).json({
   data: null,
   message: 'Project has been deleted'
  });


 }
 catch (error) {
  next(error)
 }
}
