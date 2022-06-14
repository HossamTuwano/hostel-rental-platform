const Role = require("../model/role");

exports.role = (req, res) => {
  const { role_name, date } = req.body;

  const role = new Role({
    role_name: "landlord"
  });
  try {
    role.save();
    res.send("sent");
  } catch (err) {
    console.log(err);
  }
};

exports.get_role = (req, res) => {
  Role.findOne({ _id: req.params._id }, (error, role) => {
    if (error) {
      return res.status(400).json({ error: true, message: "role not found" });
    }
    res.status(200).json({ success: true, role });
  });
};
