const jwt = require('jsonwebtoken')
const express = require('express');
const router = express.Router();

const {
    createUser,
    login,
} = require('./controller/usersController');

const { 
    emptyValidator,
    undefinedValidator,
    createDataValidator,
    loginDataValidator
} = require('../shared/index');


router.post('/create-user', emptyValidator, undefinedValidator, createDataValidator, createUser);
router.post('/login', emptyValidator, undefinedValidator, loginDataValidator, login);


module.exports = router;