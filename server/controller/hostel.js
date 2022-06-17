const Hostel = require("../model/hostel");

exports.addHostel = (req, res) => {
  const hostel_name = req.body.hostel_name;
  const contact_name = req.body.contact_name;
  const price = req.body.price;
  const phone = req.body.phone;
  const region = req.body.region;
  const city = req.body.city;
  const image = req.file.path;
  const room_type = req.body.room_type;
  const bed_options = req.body.bed_options;
  const no_of_beds = req.body.no_of_beds;

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
    hostel_owner: req.user.id,
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

exports.update_hostel = (req, res) => {
  const hostel_name = req.body.hostel_name;
  const contact_name = req.body.contact_name;
  const price = req.body.price;
  const phone = req.body.phone;
  const region = req.body.region;
  const city = req.body.city;
  const image = req.file.path;
  const room_type = req.body.room_type;
  const bed_options = req.body.bed_options;
  const no_of_beds = req.body.no_of_beds;

  const hostelId = req.params._id;

  Hostel.findById(hostelId).then((post) => {
    if (!post) {
      const error = new Error("Could not find post.");
      error.statusCode = 404;
      throw error;
    }

    post.hostel_name = hostel_name;
    post.contact_name = contact_name;
    post.price = price;
    post.phone = phone;
    post.region = region;
    post.city = city;
    post.image = image;
    post.room_type = room_type;
    post.bed_options = bed_options;
    post.no_of_beds = no_of_beds;
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
        .json(200)
        .json({ error: true, message: "failed to delete hostel" });
    }
    res
      .status(200)
      .json({ succes: true, message: "Hostel successfully deleted" });
  });
};
