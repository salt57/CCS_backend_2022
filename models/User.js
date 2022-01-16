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
  techAttempted: [
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
  managementAttempted: [
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
  designAttempted: [
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
  },
  round: {
    type: Number,
    required: true,
    enum: [1,2,3],
    default: 1
  },
  questionLoaded: [
      {
        quesId: {
          type: Number,
          required: true,
          unique: true,
        },
        question: {
          text: {
            type: String,
            required: true,
          },
          img: [
            {
              type: String,
            },
          ],
          links: [
            {
              type: String,
            },
          ],
        },
      },
    ],

});
const User = mongoose.model('user', UserSchema);
module.exports = User;