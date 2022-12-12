const express = require('express')
const router = express.Router()
const passport = require('../config/passportJWT')
const jwt = require('jsonwebtoken');
const { sendMailer } = require('../controllers/customerControllers');
const Restaurant = require('../models/restaurant');

router.post('/signup', async (req, res) => {

    const user = await Restaurant.create(req.body)
    return res.status(200).json({
        user,
        message: "Restaurant successfully Added!"
    })

})


router.post(
    '/signin',

    async (req, res) => {

        console.log(req.params)

        const user = await Restaurant.findOne({ email: req.body.email }).populate('food')

        if (user) {

            const body = { _id: user._id, email: user.email };
            const token = jwt.sign({ user: body }, 'mykey', { expiresIn: '5d' });

            return res.json({ token, user, message: "Restaurant successfully Added!" });

        }
        return res.status(401).json({ user: null, message: "Restaurant not found!" });
    }
);




router.get(
    '/profile',
    (req, res, next) => {
        res.json({
            message: 'You made it to the secure route',
            user: req.user,
            token: req.query.secret_token
        })
    }
);

module.exports = router