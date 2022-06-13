const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HostelSchema = new Schema({
  hostel_name: {
    type: String,
    required: true,
  },
  contact_name: {
    type: String,
    required: true,
  },

  price: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  region: { type: String, required: true },

  city: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    // required: true,
  },

  room_type: {
    type: String,
    required: true,
  },

  bed_options: {
    type: String,
    required: true,
  },

  no_of_beds: {
    type: String,
    required: true,
  },

  hostel_owner : {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Hostel", HostelSchema);
