const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
});
const Admin = mongoose.model('admin', AdminSchema);
module.exports = Admin;