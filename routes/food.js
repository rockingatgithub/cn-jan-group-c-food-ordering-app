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

router.get('/getFood', passport.authenticate('jwt', {failureRedirect: '/login'})  , async (req, res) => {
    console.log(req.query.sort, req.url)

    const food = await Food.find({}).sort({'price' : Number(req.query.sort)}).skip(1).limit(1)
    return res.status(200).json({
        food: food
    })

})





module.exports = router