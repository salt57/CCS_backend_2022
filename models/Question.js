const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
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
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
  },
  domain: {
    type: String,
    enum: ["Tech", "Design", "Management"],
    required: true,
  },
});

const Question = mongoose.model("question", QuestionSchema);
module.exports = Question;
