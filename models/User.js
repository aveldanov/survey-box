const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});


//loads the Schema into mongoose
mongoose.model('users', userSchema); 