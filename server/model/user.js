const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  }, 
  phone: {
    type: String,
    required: true,
  },

  role_id: {
    type: Schema.Types.ObjectId,
    ref: "Role",
    autopopulate: true,
  },
  password: { 
    type: String,
    require: true,
  },
});



UserSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("User", UserSchema);
