const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");

dotenv.config({ path: "./.env" });
const port = process.env.PORT;

const dbURI = process.env.DBURI;

const app = express();

app.use(express.json());
app.use(cors());
app.use(authRouter);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + name);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(cors());
app.use(express.json());
app.use(multer({ storage: storage, fileFilter: fileFilter }).single("image"));
app.use("/images", express.static(path.join(__dirname, "images")));

mongoose
  .connect(dbURI)
  .then((res) => {
    app.listen(port, () => {
      console.log(`connected to server 127.0.0.0:${port}`);
    });
  })
  .catch(
    (err) => {
      console.log(err);
    },
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
  );

mongoose.connection.on("open", () => {
  console.log("connected to database");
});
