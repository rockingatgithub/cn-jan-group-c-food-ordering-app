const passport = require('passport');
const Customer = require('../models/customer');
const localStrategy = require('passport-local').Strategy;

  // ...

passport.use(
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const user = await Customer.findOne({ email });
  
          if (!user) {
            return done(null, false, { message: 'User not found' });
          }
  
          return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser(function(user, done) {
    console.log("the serilaized user", user)
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    console.log("the serilaized user", user)
        done(null, user);
  });


  module.exports = passport