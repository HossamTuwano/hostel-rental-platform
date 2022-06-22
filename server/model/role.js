const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleSchema = {
  role_name: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now(),
  },  
};

module.exports = mongoose.model("Role", RoleSchema);
