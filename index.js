const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys.js');

const app = express();

// initiate passport auth (two args)
passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
},
  (accessToken, refreshToken, profile, done) => {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile)
  }));

//route handler (middleware)
// 'google' --> Google Strategy identifier
// level of access to user's profile

app.get('/auth/google', passport.authenticate('google',
  {
    scope: ['profile', 'email']
  }
)
);

app.get('/auth/google/callback', passport.authenticate('google'));


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`))