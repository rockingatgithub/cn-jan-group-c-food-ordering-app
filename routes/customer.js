const express = require('express')
const Customer = require('../models/customer')
const router = express.Router()
const passport = require('../config/passportJWT')
const jwt = require('jsonwebtoken');
const { sendMailer } = require('../controllers/customerControllers');

// ...


router.post('/signup', async (req, res) => {

  const user = await Customer.create(req.body)
  return res.status(200).json({
    user,
    message: "Customer successfully Added!"
  })

})


router.post(
  '/signin',

  async (req, res) => {

    console.log(req.body)

    const user = await Customer.findOne({ email: req.body.email })

    if (user) {

      const body = { _id: user._id, email: user.email };
      const token = jwt.sign({ user: body }, 'mykey', { expiresIn: '5d' });

      return res.json({ token, user, message: "Customer successfully Added!" });

    }
    return res.status(401).json({ user: null, message: "Customer not found!" });
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


router.get('/createSession', passport.authenticate('jwt', { failureRedirect: '/profile', session: false }),

  (req, res) => {

    if (req.user)
      return res.json({ user: req.user, message: "Customer successfully Added!" });
    return res.status(401).json({ message: "Unauthorized!" });


  }

)

router.post('/sendMail', sendMailer)

module.exports = router