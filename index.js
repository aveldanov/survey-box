const express = require('express');
require('./services/passport');
const keys = require('./config/keys');
const mongoose = require('mongoose');

mongoose.connect(keys.mongoURI,
  { useNewUrlParser: true });


const app = express();
require('./routes/authRoutes')(app);






const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`))