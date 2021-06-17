const User = require('../../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const mongoose = require ('mongoose');
const validateRegisterInput = require("../../validation/user/register");
const validateLoginInput = require("../../validation/user/login");
const validateEmail = require("../../validation/user/validateEmail");
const validateRole =  require("../../validation/user/validateRole");
const validateName =  require("../../validation/user/validateName");
const validatePasswordInput = require("../../validation/user/validatePassword");
const { roles } = require('../roles')

exports.grantAccess = function(action, resource) {

 return async (req, res, next) => {
  try {
   const email = req.query.email;
   //res.status(200).json(email);
  const user = await User.findOne({email});
  if(user ) {
    const role = user.role;
    //res.status(200).json({id: role});
    const permission = roles.can(role)[action](resource);
     //res.status(400).json({message:permission.granted});
     if (permission.granted == false) {
       return res.status(401).json({
         error: "You don't have enough permission to perform this ddd"
       });
     }
    next()
  }
  else{
    return res.status(401).json({
      error: "You don't have enough permission to perform this 333"
    });
  }
  }
  catch (error) {
    next(error)
  }
}
}

exports.allowIfLoggedin = async (req, res, next) => {
 try {

  const user = req.query.auth;

  if (typeof user === 'string' || user instanceof String)
    userBool = (user.toLowerCase() === "true");
  else {
    userBool = user;
  }
  //res.status(400).json({user:user});
  if (userBool==false) {
   return res.status(400).json({
    error: "You need to be logged in to access this route"
    });
  }
   next();
  } catch (error) {
   next(error);
  }
}

async function hashPassword(password) {
 return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
 return await bcrypt.compare(plainPassword, hashedPassword);
}

exports.signup = async (req, res, next) => {
 try {
   // Validation code here
   const { errors, isValid } = validateRegisterInput(req.body);
   // Check validation
   if (!isValid) {
     return res.status(400).json(errors);
   }

  const hashedPassword = await hashPassword(req.body.password);
  const email = req.body.email;
  const user = await User.findOne({ email });
  if (user) return res.status(400).json({data: "User already exists."});

  const signedupUser = new User({
   name: req.body.name,
   email: req.body.email,
   password: hashedPassword,
   password2: hashedPassword,
   role: req.body.role || "user",
   createdById: req.body.createdBy,
   createdByName: req.body.createdByName
  });

  await signedupUser.save()
  res.status(200).json({message:"User created."})
}
catch(error) {
   next(error)
 }
}

exports.login = async(req, res, next) => {
  try {
    //validation code here
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email });
    if (!user) {
      errors.email = 'Email does not exist.';
      return res.status(400).json(errors);
    }

    const validPassword = await validatePassword(password, user.password);
    if (!validPassword) {
      errors.password = 'Password is incorrect.';
      return res.status(400).json(errors);
    }

    const payload = {
          id: user._id,
          name: user.name,
          role: user.role,
          email: user.email,
          tableData: {}
    };

    const token = jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {
            expiresIn: 31556926 // 1 year in seconds
          }
        );

    res.status(200).json({
      success: true,
      token: "Bearer " + token
    });
  }
  catch(error) {
      next(error);
  }
}

exports.getUsers = async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({
    data: users
  });
}

exports.getUser = async (req, res, next) => {
  try {
    const email = req.query.email;
  //  res.status(200).json(({email}));
    const user = await User.findOne({email});

    if (!user) return next(new Error('User does not exist.'));
    res.status(200).json({
      data: user
    });
  }
  catch (error) {
    next(error)
  }
}
 //validate role
exports.updateUser = async (req, res, next) => {
 try {
   const email = req.query.email;
   const email_upd = req.query.emailupdate;

   const user_req = await User.find({email:email});
   const user_upd = await User.find({email:email_upd});

   const userRole = user_req[0].role;
   const updateRole = user_upd[0].role;

   if (userRole == "admin") {
     if(updateRole == "super-admin" || updateRole == "admin") {
       res.status(401).json({
         error: "Action forbidden: Not allowed to change this user."
       });
      }
    }

   const userBody = req.body;

   if (userBody.email)
   {
     const { errors, isValid } = validateEmail(userBody);
     // Check validation
     if (!isValid) {
       return res.status(400).json(errors);
     }
   }

   if (userBody.role)
   {
     const { errors, isValid } = validateRole(userBody);
     // Check validation
     if (!isValid) {
       return res.status(400).json(errors);
     }
   }

   if (userBody.name)
   {
     const { errors, isValid } = validateName(userBody);
     // Check validation
     if (!isValid) {
       return res.status(400).json(errors);
     }
   }

   if (userBody.password)
   {
     const { errors, isValid } = validatePasswordInput(userBody);
     // Check validation
     if (!isValid) {
       return res.status(400).json(errors);
     }
     userBody.password = await hashPassword(userBody.password);
     userBody.password2 = userBody.password;
   }

   await User.findByIdAndUpdate(user_upd[0]._id, userBody);
   const user = await User.findById(user_upd[0]._id);

   res.status(200).json({
    data: user,
    message: 'User updated successfully.'
   });
  }
  catch (error) {
   next(error)
  }
}

exports.deleteUser = async (req, res, next) => {
 try {

  const email = req.query.email;
  const email_del = req.query.emailDelete;

  const user_req = await User.find({email:email});
  const user_delete = await User.find({email:email_del});

  const userRole = user_req[0].role;
  const deleteRole = user_delete[0].role;

  if (userRole == "admin" && (deleteRole == "super-admin" || deleteRole == "admin")) {
    res.status(401).json({
      error: "Action forbidden: Not allowed to change this user."
    });
  }
  else{

    await User.findByIdAndDelete(user_delete[0]._id);
    res.status(200).json({
     data: null,
     message: 'User has been deleted'
    });
  }

 }
 catch (error) {
  next(error)
 }
}
