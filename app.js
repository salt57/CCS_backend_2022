const express = require('express');

const app = express();
const rateLimit = require("express-rate-limit");
const cors = require('cors');

require("dotenv/config");
require('./models/dbInit');

app.use(cors())

app.set('trust proxy', true);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const authMiddleware = require('./middleware/authorize')
// const testRoute = require('./routes/test')
const submitRoute = require('./routes/submit')
// const autosaveRoute = require('./routes/autosave')
const questionRoute = require('./routes/questions')
const adminRoute = require('./admin/admin')
const startRoute = require('./routes/start')
// const createUserRoute = require('./routes/createUser')

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 10,
});

// app.use('/test', testRoute);
app.use('/admin', adminRoute);
app.use('/submit', submitRoute);
// app.use('/autosave',apiLimiter, autosaveRoute);
app.use('/question',apiLimiter, questionRoute);
app.use('/start',apiLimiter, startRoute);
// app.use('/createUser',apiLimiter, createUserRoute);

// const Admin = require('./models/Admin')
// const admin = new Admin({
//   username: "stupidbidhi"
// })
// admin.save()

// const Question = require('./models/Question')
// const question = new Question({
//   quesId: 8,
//   question: { text: "hihihihi", img: [], links: [] },
//   domain: "Tech",
//   difficulty: "Hard",
// });
// const question1 = new Question({
//   quesId: 9,
//   question: { text: "hihihihi", img: [], links: [] },
//   domain: "Tech",
//   difficulty: "Hard",
// });
// const question2 = new Question({
//   quesId: 7,
//   question: { text: "hihihihi", img: [], links: [] },
//   domain: "Tech",
//   difficulty: "Hard",
// });
// question.save()
// question1.save()
// question2.save()


app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(process.env.PORT, () => {
    console.log('server started');
});