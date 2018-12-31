const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
//we first define a User then we use passport
require('./models/User');
require('./services/passport');
const cookieSession = require('cookie-session');
const passport = require('passport');



mongoose.connect(keys.mongoURI,
  { useNewUrlParser: true });

const app = express();

//middleware - pre-processing
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

// Env set by Heroku
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`))