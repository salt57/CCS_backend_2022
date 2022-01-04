const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  // role: {
  //   type: String,
  //   enum: ["admin", "guest"],
  // },
  domainsAttempted: [
    {
      type: String,
      enum: ["Tech", "Design", "Management"],
    },
  ],
  answer: {
    type: String,
    required: true
  }
  
});
const User = mongoose.model('user', UserSchema);
module.exports = User;