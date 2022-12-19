// ...
const passport = require('passport')
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'mykey',
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
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

