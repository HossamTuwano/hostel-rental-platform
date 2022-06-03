const Hostel = require("../model/hostel");

exports.addHostel = (req, res) => {
  const {
    hostel_name,
    hostel_price,
    region,
    city,
    contact_name,
    phone,
    room_type,
    bed_options,
    no_of_beds,
  } = req.body;
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
