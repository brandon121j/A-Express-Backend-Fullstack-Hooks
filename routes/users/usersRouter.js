const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const {
    createUser,
    login
} = require('./controller/usersController');

const { 
    emptyValidator,
    undefinedValidator,
    createDataValidator,
    loginDataValidator
} = require('../shared/index');


router.post('/create-user', undefinedValidator, emptyValidator, createDataValidator, createUser);
router.post('/login', undefinedValidator, emptyValidator, loginDataValidator, login);


module.exports = router;