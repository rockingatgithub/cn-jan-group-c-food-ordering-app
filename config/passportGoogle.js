const passport =require("passport")
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
        done(null, user);
});

passport.use(new GoogleStrategy({
        clientID: process.env.OAUTH_CLIENTID,
        clientSecret:process.env.OAUTH_CLIENT_SECRET,
        callbackURL: "http://localhost:8000/google/callback",
    },
    function( accessToken, refreshToken, profile, done) {
            return done(null, profile);
    }
));

module.exports =passport