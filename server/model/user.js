const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    types: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
