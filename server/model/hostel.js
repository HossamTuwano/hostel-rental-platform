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
    type: Array,
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

  status: {
    type: Number,
    default: 0,
  },

  // stuId: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",

  // },

  no_of_beds: {
    type: String,
    required: true,
  },

  number_of_rooms: {
    type: String,
    required: true,
  },

  hostel_owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    autopopulate: { maxDepth: 1 },
  },
});

HostelSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("Hostel", HostelSchema);
