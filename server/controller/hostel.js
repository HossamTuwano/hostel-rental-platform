const Hostel = require("../model/hostel");

// adding hostel

exports.addHostel = (req, res) => {
  const img = [];

  const imgloop = req.files.map((image) => {
    img.push(image.path);
  });

  console.log(img);
  const hostel_name = req.body.hostel_name;
  const contact_name = req.body.contact_name;
  const price = req.body.price;
  const phone = req.body.phone;
  const region = req.body.region;
  const district = req.body.district;
  const image = img;
  const room_type = req.body.room_type;
  const bed_options = req.body.bed_options;
  const no_of_beds = req.body.no_of_beds;
  const number_of_rooms = req.body.number_of_rooms;
  const ward = req.body.ward;
  const street = req.body.street;
  // const availabilty = req.body.availabilty

  const hostel = new Hostel({
    hostel_name: hostel_name,
    contact_name: contact_name,
    price: price,
    phone: phone,
    region: region,
    district: district,
    image: image,
    room_type: room_type,
    bed_options: bed_options,
    no_of_beds: no_of_beds,
    hostel_owner: req.user.id,
    number_of_rooms: number_of_rooms,
    ward: ward,
    street: street,
  });

  hostel
    .save()
    .then(() => res.status(201).json({ msg: "hostel added", hostel }))
    .catch((err) => console.log(err));
};

// getting all hostels

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
  const name = new RegExp(req.params.hostel_name);
  // if (name) {
  //   return res.status(200).json({ param: name, succes: true });
  // }
  // res.status(400).json({ error: true });

  Hostel.find({ hostel_name: name }, (error, hostel) => {
    if (error) {
      return res
        .status(400)
        .json({ error: true, message: "hostel not found", error: error });
    }
    res
      .status(200)
      .json({ success: true, message: "hostel found", hostel: hostel });
  });
};

// gettgin single hostel

exports.get_single_hostel = (req, res) => {
  const _id = req.params._id;
  Hostel.findById(_id, (err, hostel) => {
    if (err) {
      return res
        .status(400)
        .json({ success: false, message: "hostel not found" });
    }
    res.status(200).json({ success: true, message: "hostel found", hostel });
  });
};

exports.update_hostel = (req, res) => {
  const hostel_name = req.body.hostel_name;
  const contact_name = req.body.contact_name;
  const price = req.body.price;
  const phone = req.body.phone;
  const region = req.body.region;
  const district = req.body.district;
  const image = req.file.path;
  const room_type = req.body.room_type;
  const bed_options = req.body.bed_options;
  const no_of_beds = req.body.no_of_beds;
  const number_of_rooms = req.body.number_of_rooms;
  const ward = req.body.ward;
  const hostelId = req.params._id;
  const street = req.body.street;

  Hostel.findById(hostelId).then((hostel) => {
    if (!hostel) {
      const error = new Error("Could not find post.");
      error.statusCode = 404;
      throw error;
    }

    hostel.hostel_name = hostel_name;
    hostel.contact_name = contact_name;
    hostel.price = price;
    hostel.phone = phone;
    hostel.region = region;
    hostel.district = district;
    hostel.image = image;
    hostel.room_type = room_type;
    hostel.bed_options = bed_options;
    hostel.no_of_beds = no_of_beds;

    // post.hostel_owner = hostel_owner;

    return post
      .save()
      .then((result) => {
        res.status(200).json({ message: "Post updated!", post: result });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.delete_hostel = (req, res) => {
  Hostel.findOneAndDelete({ _id: req.params._id }, (error, hostel) => {
    if (error) {
      return res
        .json(400)
        .json({ error: true, message: "failed to delete hostel" });
    }
    res
      .status(200)
      .json({ succes: true, message: "Hostel successfully deleted" });
  });
};

// api to update data

exports.update_status = (req, res) => {
  console.log(req.body.id);

  Hostel.updateOne(
    { _id: req.body.id },

    { $set: { status: 1 } },
    (error, status) => {
      if (error) {
        return res.status(400).json({ error: true, error: error });
      }
      res.status(200).json({ succes: true, status: status });
    }
  );
};

// accept booking

exports.accept_booking = (req, res) => {
  console.log(req.body.id);
  console.log(req.body);

  Hostel.updateOne(
    { _id: req.body.id },

    { $set: { status: 2 } },
    (error, status) => {
      if (error) {
        return res.status(400).json({ error: true, error: error });
      }
      res.status(200).json({ succes: true, status: status });
    }
  );
};

exports.get_similar_hostels = (req, res) => {
  Hostel.find({ contact_name: req.params.contact_name }, (error, hostel) => {
    if (error) {
      return res.status(400).json({ error: error });
    }
    res
      .status(200)
      .json({ success: true, hostel: hostel, message: "hostel found" });
  });
};

exports.get_booking_listing = (req, res) => {
  Hostel.find({ $or: [{ status: 1 }, { status: 2 }] }, (error, hostel) => {
    if (error) {
      res
        .status(200)
        .json({ success: false, message: "could not find hostels" });
    }
    res.status(200).json({ msg: "hostel found", hostel });
  });
};
