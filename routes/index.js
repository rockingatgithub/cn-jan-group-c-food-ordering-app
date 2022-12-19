const express = require('express')
const router = express.Router()
const passport = require('../config/passportGoogle')



router.use('/customer', require('./customer'))
router.use('/client', require('./restaurtant'))
router.use('/food', require('./food'))

router.get('/google',
    passport.authenticate('google', {
            scope:
                ['email', 'profile']
        }
    ));

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failed',
    }),
    function (req, res) {
        return res.json({
            user: req.user,
            navigateTo: '/profile'
        })

    }
);






module.exports = router