const mongoose = require("mongoose");

const Schema = mongoose.Schema();

const HostelSchema = new Schema({
  hostel_name: {
    type: String,
    required: true,
  },
  hostel_price: {
    type: Number,
    required: true,
  },

  region: {
    type: String,
    required: true,
  },

  city: {
    type: String,
  },

  contact_name: {
    type: String,
  },

  phone: {
    type: Number,
  },

  room_type: {
    type: String,
  },

  bed_options: {
    type: String,
  },

  no_of_beds: {
    type: Number,
  },

  image: {
    type: String,
  },
});

module.exports = mongoose.model("Hostel", HostelSchema);
