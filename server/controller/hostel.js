const Hostel = require("../model/hostel");

exports.addHostel = (req, res) => {
  // if (!req.file) {
  //   const error = new Error("Image not uploaded");
  //   error.statusCode = 422;
  //   throw error;
  // }
  const hostel_name = req.body.hostel_name;
  const hostel_price = req.body.hostel_price;
  const region = req.body.region;
  const city = req.body.city;
  const contact_name = req.body.contact_name;
  const phone = req.body.phone;
  const room_type = req.body.room_type;
  const bed_options = req.body.bed_options;
  const no_of_beds = req.body.no_of_beds;
  const image = req.file;

  const hostel = new Hostel({
    hostel_name: hostel_name,
    hostel_price: hostel_price,
    region: region,
    city: city,
    contact_name: contact_name,
    phone: phone,
    room_type: room_type,
    bed_options: bed_options,
    no_of_beds: no_of_beds,
    image: image,
  });

  hostel
    .save()
    .then((savedDoc) =>
      res.status(201).json({ success: true, savedDoc: hostel })
    );
};

exports.getHostel = (req, res) => {
  Hostel.find((error, hostel) => {
    if (error) {
      res
        .status(400)
        .json({ succes: false, message: "could not find hostels" });
    }
    res.status(200).json({ hostel: hostel });
  });
};
