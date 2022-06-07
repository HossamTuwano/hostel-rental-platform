const Role = require("../model/role");

exports.role = (req, res) => {
  const { role_name, date } = req.body;

  const role = new Role({
    role_name: ["landlord", "student"],
  });
  try {
    role.save();
    res.send("sent");
  } catch (err) {
    console.log(err);
  }
};
 