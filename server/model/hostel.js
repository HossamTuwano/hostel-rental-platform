const mongoose = require("mongoose");

const Schema = mongoose.Schema();

const HostelSchema = new Schema({
  accommodationName: {
    type: String,
    required: true,
  },
  accomodationPrice: {
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

  contactName: {
    type: String,
  },

  phone: {
    type: Number,
  },

  roomType: {
    type: String,
  },

  bedOptions: {
    type: String,
  },

  noOfBeds: {
    type: Number,
  },

  image: {
    type: String,
  },
});

module.exports = mongoose.model("Hostel", HostelSchema);
