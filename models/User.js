const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    role: { type: String, enum: ['admin', 'guest'] }
  },
});
const User = mongoose.model('user', UserSchema);
module.exports = User;