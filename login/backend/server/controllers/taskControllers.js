const Task = require('../../models/TaskModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const mongoose = require ('mongoose');
const validateTaskInput = require("../../validation/task/addNew");
const validateTaskName = require("../../validation/task/validateTaskName");
const validateDate = require("../../validation/validateDate");

exports.addNew = async (req, res, next) => {
 try {
   // Validation code here
   const { errors, isValid } = validateTaskInput(req.body);
   // Check validation
   if (!isValid) {
     return res.status(400).json(errors);
   }

   const taskName = req.body.taskName;
   const user = await Task.findOne({ taskName });
   if (user) return res.status(400).json({data: "Task already exists."});

  const signedupTask = new Task({
   taskName: req.body.taskName,
   featureName: req.body.featureName,
   taskDetails: req.body.taskDetails,
   dueDate: req.body.dueDate,
   creatorName: req.body.creatorName,
   approved:req.body.approved
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

 //validate role
exports.update = async (req, res, next) => {
 try {
   const taskName_upd = req.query.taskName;

   const task_upd = await Task.find({taskName:taskName_upd});

   const userBody = req.body;

   if (userBody.dueDate)
   {
     const { errors, isValid } = validateDate(userBody);
     // Check validation
     if (!isValid) {
       return res.status(400).json(errors);
     }
   }
   if (userBody.taskName)
   {
     const { errors, isValid } = validateTaskName(userBody);
     // Check validation
     if (!isValid) {
       return res.status(400).json(errors);
     }
   }

   await Task.findByIdAndUpdate(task_upd[0]._id, userBody);
   const user = await Task.findById(task_upd[0]._id);

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
  const taskName_del = req.query.taskName;
  const task_delete = await Task.find({taskName:taskName_del});

  await Task.findByIdAndDelete(task_delete[0]._id);
  res.status(200).json({
   data: null,
   message: 'Task has been deleted'
  });


 }
 catch (error) {
  next(error)
 }
}
