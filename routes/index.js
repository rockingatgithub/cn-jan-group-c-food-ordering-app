const express = require('express')
const router = express.Router()


router.use('/customer', require('./customer'))
router.use('/client', require('./restaurtant'))
router.use('/food', require('./food'))




module.exports = router