const passport = require('passport');
const Customer = require('../models/customer');
const localStrategy = require('passport-local').Strategy;



// ...

passport.use(
    'signup',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async ( email, password, done) => {
        try {
          const user = await Customer.create({ email, password });
  
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );


  // ...

passport.use(
    'login',
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


  module.exports = passport