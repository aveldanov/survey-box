const passport = require('passport');

module.exports = (app) => {

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
}




