const express = require('express')
const Food = require('../models/food')
const router = express.Router()
const passport = require('../config/passportJWT')

// ...

router.post('/addFood', async (req, res) => {

    const food = await Food.create(req.body)
    return res.status(200).json({
        food: food
    })

})



module.exports = router