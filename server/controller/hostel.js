const Hostel = require("../model/hostel");

const hostel_name = req.body.hostel_name;
const contact_name = req.body.contact_name;
const price = req.body.price;
const phone = req.body.phone;
const region = req.body.region;
const city = req.body.city;
const image = req.files.path;
const room_type = req.body.room_type;
const bed_options = req.body.bed_options;
const no_of_beds = req.body.no_of_beds;

exports.addHostel = (req, res) => {
  const hostel = new Hostel({
    hostel_name: hostel_name,
    contact_name: contact_name,
    price: price,
    phone: phone,
    region: region,
    city: city,
    image: image,
    room_type: room_type,
    bed_options: bed_options,
    no_of_beds: no_of_beds,
  });
  hostel
    .save()
    .then(() => res.status(201).json({ msg: "hostel added", hostel }))
    .catch((err) => console.log(err));
};

exports.getHostel = (req, res) => {
  // res.send("yo");
  Hostel.find((error, hostel) => {
    if (error) {
      res
        .status(200)
        .json({ success: false, message: "could not find hostels" });
    }
    res.status(200).json({ msg: "hostel found", hostel });
  });
};

exports.search_hostel = (req, res) => {
  Hostel.findOne({ hostel_name }, (err, hostel) => {
    if (err) {
      return res.status(400).json({ success: false, msg: "hostel not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "hostel found", hostel });
  });
};

exports.get_single_hostel = (req, res) => {
  const _id = req.params._id;
  Hostel.findById(_id, (err, hostel) => {
    if (err) {
      res.status(400).json({ success: false, message: "hostel not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "hostel found", hostel });
  });
};
