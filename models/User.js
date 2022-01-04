const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  domainsAttempted: [
    {
      type: String,
      enum: ["Tech", "Design", "Management"],
    },
  ],
  answer: {
    type: String,
    // required: true
  },
  questionLoaded: [
    {
      type: Number,
      // required: true,
      // unique: true,
    },
  ],
  questionAttempted: 
  [
    {
      quesId: {
        type: Number,
        // required: true,
      },
      answer: {
        type: String,
        // required: true,
      },
    },
  ],
});
const User = mongoose.model('user', UserSchema);
module.exports = User;