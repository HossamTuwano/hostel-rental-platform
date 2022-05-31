const mongoose = require("mongoose");

require("dotenv/config");

const port = process.env.path;
const dbURI = process.env.DBURI;


module.exports = () => {
  const needed = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };

  mongoose.Promise = global.Promise;

  mongoose.connect(dbURI, needed);

  mongoose.connection.on("connected", () => {
    console.log("connect to database");
  });

  mongoose.connection.on("error", (error) => {
    console.log(error);
  });
};


