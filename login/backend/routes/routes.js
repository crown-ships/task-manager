const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const userController = require('../server/controllers/userControllers');
const companyController = require('../server/controllers/companyControllers');
const projectController = require('../server/controllers/projectControllers');

router.post('/signup', userController.signup);

router.post('/user',  userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), userController.updateUser);

router.delete('/users', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'),  userController.deleteUser);

router.post('/login', userController.login)

router.get('/user', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'profile'),  userController.getUser);

router.get('/users', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'),  userController.getUsers);

//------------------companies
router.post('/newCompany', userController.allowIfLoggedin, userController.grantAccess('create', 'company'),companyController.addNew);

router.post('/updCompany',  userController.allowIfLoggedin, userController.grantAccess('updateAny', 'company'), companyController.update);

router.delete('/delCompany', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'company'),  companyController.delete);

router.get('/getCompanies', userController.allowIfLoggedin, userController.grantAccess('readAny', 'company'),  companyController.getCompanies);

//------------------projects
router.post('/newProject', userController.allowIfLoggedin, userController.grantAccess('create', 'project'),projectController.addNew);

router.post('/updProject',  userController.allowIfLoggedin, userController.grantAccess('updateAny', 'project'), projectController.update);

router.post('/updAllProjects',  userController.allowIfLoggedin, userController.grantAccess('updateAny', 'project'), projectController.updateAll);

router.delete('/delProject', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'project'),  projectController.delete);

router.get('/getProjects', userController.allowIfLoggedin, userController.grantAccess('readAny', 'project'),  projectController.getProjects);
module.exports = router;

//------------------features
router.post('/newFeature', userController.allowIfLoggedin, userController.grantAccess('create', 'project'),projectController.addNew);

router.post('/updFeature',  userController.allowIfLoggedin, userController.grantAccess('updateAny', 'project'), projectController.update);

router.post('/updAllFeatures',  userController.allowIfLoggedin, userController.grantAccess('updateAny', 'project'), projectController.updateAll);

router.delete('/delFeature', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'project'),  projectController.delete);

router.get('/getFeatures', userController.allowIfLoggedin, userController.grantAccess('readAny', 'project'),  projectController.getProjects);
module.exports = router;

//------------------projects
router.post('/newTask', userController.allowIfLoggedin, userController.grantAccess('create', 'project'),projectController.addNew);

router.post('/updTask',  userController.allowIfLoggedin, userController.grantAccess('updateAny', 'project'), projectController.update);

router.post('/updAllTasks',  userController.allowIfLoggedin, userController.grantAccess('updateAny', 'project'), projectController.updateAll);

router.delete('/delTask', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'project'),  projectController.delete);

router.get('/getTasks', userController.allowIfLoggedin, userController.grantAccess('readAny', 'project'),  projectController.getProjects);
module.exports = router;
