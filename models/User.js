const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  firstName: String,
  lastName: String,
  credits: {
    type: Number,
    default: 0
  }
});


//loads the Schema into mongoose
mongoose.model('users', userSchema); 