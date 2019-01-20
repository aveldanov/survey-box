const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
//we first define a User then we use passport
require('./models/User');
require('./models/Survey');
require('./services/passport');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');


mongoose.connect(keys.mongoURI,
  { useNewUrlParser: true });

const app = express();

//middleware - pre-processing
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  //Express will serve up production assets
  //like main.js and main.css
  app.use(express.static('client/build'));
  //Express will serve up the index.html file if it does not recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })

}

// Env set by Heroku
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`))