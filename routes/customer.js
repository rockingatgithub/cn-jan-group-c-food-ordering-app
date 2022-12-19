const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const multer  = require('multer')
const { sendMailer } = require('../controllers/customerControllers');
const Customer = require('../models/customer')
const passport = require('../config/passportLocal')
// ...

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '/uploads')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix)
//   }
// })

const upload = multer({ dest: 'uploads/' })


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


router.get('/createSession', passport.authenticate('local', { failureRedirect: '/profile', session: true }),

  (req, res) => {

    if (req.user)
      return res.json({ user: req.user, message: "Customer successfully Added!" });
    return res.status(401).json({ message: "Unauthorized!" });


  }

)

router.post('/profile_avatar', upload.single('avatar') ,(req, res) => {
  console.log(req.file)
})

router.post('/sendMail', sendMailer)

module.exports = router