const express = require('express')
const router = express.Router()


router.use('/customer', require('./customer'))
router.use('/client', require('./restaurtant'))




module.exports = router