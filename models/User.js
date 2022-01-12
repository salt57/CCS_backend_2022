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
  techAttempted: 
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
  managementAttempted: 
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
  designAttempted: 
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
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  }
});
const User = mongoose.model('user', UserSchema);
module.exports = User;