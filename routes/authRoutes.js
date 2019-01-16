const passport = require('passport');

module.exports = (app) => {

  //route handler (middleware)
  // 'google' --> Google Strategy identifier
  // level of access to user's profile

  //sign-up
  app.get('/auth/google', passport.authenticate('google',
    {
      scope: ['profile', 'email']
    }
  )
  );

  app.get(
    '/auth/google/callback', passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys')
    }

  );

  //sign-out

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  //passport attaches(outcome) User property to req.user
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
    //res.send(req.session);
  })

}




