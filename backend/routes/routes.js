const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const userController = require('../server/controllers/userControllers');
const companyController = require('../server/controllers/companyControllers');
const projectController = require('../server/controllers/projectControllers');
const featureController = require('../server/controllers/featureControllers');
const taskController = require('../server/controllers/taskControllers');
const investmentController = require('../server/controllers/investmentControllers');
const vendorController = require('../server/controllers/vendorControllers');
const paymentController = require('../server/controllers/paymentControllers');
const returnController = require('../server/controllers/returnControllers');
const investorController = require('../server/controllers/investorControllers');

router.post('/signup', userController.signup);

router.post('/user',  userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), userController.updateUser);

router.delete('/users', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'),  userController.deleteUser);

router.post('/login', userController.login)

router.get('/user', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'profile'),  userController.getUser);

router.get('/users', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'),  userController.getUsers);

router.get('/filteredUsers', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'),  userController.getFilteredUsers);

//------------------COMPANIES
router.post('/newCompany', userController.allowIfLoggedin, userController.grantAccess('create', 'company'),companyController.addNew);

router.post('/updCompany',  userController.allowIfLoggedin, userController.grantAccess('updateAny', 'company'), companyController.update);

router.delete('/delCompany', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'company'),  companyController.delete);

router.get('/getCompanies', userController.allowIfLoggedin, userController.grantAccess('readAny', 'company'),  companyController.getCompanies);

//------------------PROJECTS
router.post('/newProject', userController.allowIfLoggedin, userController.grantAccess('create', 'project'),projectController.addNew);

router.post('/updProject',  userController.allowIfLoggedin, userController.grantAccess('updateAny', 'project'), projectController.update);

router.post('/updAllProjects',  userController.allowIfLoggedin, userController.grantAccess('updateAny', 'project'), projectController.updateAll);

router.delete('/delProject', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'project'),  projectController.delete);

router.get('/getProjects', userController.allowIfLoggedin, userController.grantAccess('readAny', 'project'),  projectController.getProjects);

router.get('/getFilteredProjects', userController.allowIfLoggedin, userController.grantAccess('readAny', 'project'),  projectController.getFilteredProjects);


//------------------FEATURES
router.post('/newFeature', userController.allowIfLoggedin, userController.grantAccess('create', 'feature'),featureController.addNew);

router.post('/updFeature',  userController.allowIfLoggedin, userController.grantAccess('updateAny', 'feature'), featureController.update);

router.post('/updAllFeatures',  userController.allowIfLoggedin, userController.grantAccess('updateAny', 'feature'), featureController.updateAll);

router.delete('/delFeature', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'feature'),  featureController.delete);

router.get('/getFeatures', userController.allowIfLoggedin, userController.grantAccess('readAny', 'feature'),  featureController.getFeatures);

router.get('/getFilteredFeatures', userController.allowIfLoggedin, userController.grantAccess('readAny', 'feature'),  featureController.getFilteredFeatures);


//------------------TASKS
router.post('/newTask', userController.allowIfLoggedin, userController.grantAccess('create', 'task'),taskController.addNew);

router.post('/updTask',  userController.allowIfLoggedin, userController.grantAccess('updateAny', 'task'), taskController.update);

router.post('/updAllTasks',  userController.allowIfLoggedin, userController.grantAccess('updateAny', 'task'), taskController.updateAll);

router.delete('/delTask', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'task'),  taskController.delete);

router.get('/getTasks', userController.allowIfLoggedin, userController.grantAccess('readAny', 'task'),  taskController.getTasks);

router.get('/getFilteredTasks', userController.allowIfLoggedin, userController.grantAccess('readAny', 'task'),  taskController.getFilteredTasks);


//------------------INVESTMENTS
router.post('/newInv', userController.allowIfLoggedin, userController.grantAccess('create', 'investment'),investmentController.addNew);

router.post('/updInv',  userController.allowIfLoggedin, userController.grantAccess('updateAny', 'investment'), investmentController.update);

router.delete('/delInv', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'investment'),  investmentController.delete);

router.get('/getInvs', userController.allowIfLoggedin, userController.grantAccess('readAny', 'investment'),  investmentController.getInvestments);

//------------------VENDORS
router.post('/newVendor', userController.allowIfLoggedin, userController.grantAccess('create', 'vendor'),vendorController.addNew);

router.post('/updVendor',  userController.allowIfLoggedin, userController.grantAccess('updateAny', 'vendor'), vendorController.update);

router.delete('/delVendor', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'vendor'),  vendorController.delete);

router.get('/getVendors', userController.allowIfLoggedin, userController.grantAccess('readAny', 'vendor'),  vendorController.getVendors);

//------------------PAYMENT REQUESTS
router.post('/newPayment', userController.allowIfLoggedin, userController.grantAccess('create', 'payment'),paymentController.addNew);

router.post('/updPayment',  userController.allowIfLoggedin, userController.grantAccess('updateAny', 'payment'), paymentController.update);

router.post('/updAllPayments',  userController.allowIfLoggedin, userController.grantAccess('updateAny', 'payment'), paymentController.updateAll);

router.delete('/delPayment', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'payment'),  paymentController.delete);

router.get('/getPayments', userController.allowIfLoggedin, userController.grantAccess('readAny', 'payment'),  paymentController.getPayments);

//------------------RETURNS
router.post('/newReturn', userController.allowIfLoggedin, userController.grantAccess('create', 'return'),returnController.addNew);

router.delete('/delReturn', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'return'),  returnController.delete);

router.post('/updReturn', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'return'),  returnController.update);

router.get('/getReturns', userController.allowIfLoggedin, userController.grantAccess('readAny', 'return'),  returnController.getReturns);

//------------------INVESTORS
router.post('/newInvestor', userController.allowIfLoggedin, userController.grantAccess('create', 'investor'),investorController.addNew);

router.post('/updInvestor',  userController.allowIfLoggedin, userController.grantAccess('updateAny', 'investor'), investorController.update);

router.delete('/delInvestor', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'investor'),  investorController.delete);

router.get('/getInvestors', userController.allowIfLoggedin, userController.grantAccess('readAny', 'investor'),  investorController.getInvestors);



module.exports = router;
