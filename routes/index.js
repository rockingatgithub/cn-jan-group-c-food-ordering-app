const express = require('express')
const router = express.Router()
const passport = require('../config/passportJWT');
const Customer = require('../models/customer');
const jwt = require('jsonwebtoken')

router.use('/customer', require('./customer'))



module.exports = router