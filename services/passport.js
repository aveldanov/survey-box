const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose'); const keys = require('../config/keys.js');


//pull out Schema out of mongoose
const User = mongoose.model('users');

//serialize User --> convert user info into a token
passport.serializeUser((user, done) => {
  //mongoDB record id
  done(null, user.id);
  console.log('serialize', user.id);
});

//deserialize User --> convert user.id to a User -->req.user
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      console.log('deserialize', user)
      done(null, user);
    });
});


// initiate passport auth (two args)
passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
},
  (accessToken, refreshToken, profile, done) => {
    // done - tells Passport we are complete it can continue with authentication
    User.findOne({
      googleId: profile.id
    })
      .then((existingUser) => {
        if (existingUser) {
          // we already have a record with this profile.id
          // null means - no issues to record
          done(null, existingUser);
        } else {
          //no such user - make a record
          //create a new instance of a User
          new User({
            googleId: profile.id
          })
            .save()
            .then(user => {
              done(null, user)
            })
        }
      })



  }));


