const express = require('express')
const Customer = require('../models/customer')
const router = express.Router()
const passport = require('../config/passportJWT')
const jwt = require('jsonwebtoken');
const { sendMailer } = require('../controllers/customerControllers');

// ...


router.post('/signup', async (req, res) => {

    console.log(req.user)
    return res.status(200).json({
        user: req.user,
        message: "Customer successfully Added!"
    })

}  )


router.post(
    '/signin',

    async (req, res) => {

        console.log(req.body)

        const user = await Customer.findOne({email: req.body.email})

        const body = { _id: user._id, email: user.email };
                const token = jwt.sign({ user: body }, 'mykey', { expiresIn: '1h' });
  
                return res.json({ token, user, message: "Customer successfully Added!" });

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

router.get('/sendMail', sendMailer)

module.exports = router