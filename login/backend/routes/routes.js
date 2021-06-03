const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const userController = require('../server/controllers/userControllers');
const companyController = require('../server/controllers/companyControllers');

router.post('/signup', userController.signup);

router.post('/user',  userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), userController.updateUser);

router.delete('/users', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'),  userController.deleteUser);

router.post('/login', userController.login)

router.get('/user', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'profile'),  userController.getUser);

router.get('/users', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'),  userController.getUsers);

//------------------companies
router.post('/newCompany', userController.allowIfLoggedin, userController.grantAccess('create', 'company'),companyController.addNew);

router.post('/updCompany',  userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), companyController.update);

router.delete('/delCompany', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'),  companyController.delete);

router.get('/getCompanies', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'),  companyController.getCompanies);
module.exports = router;
