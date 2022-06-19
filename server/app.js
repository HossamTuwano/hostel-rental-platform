const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const authRouter = require("./routes/auth");
const roleRouter = require("./routes/role");
const hostelRouter = require("./routes/hostel");
const db = require("./config/config");

dotenv.config({ path: "./.env" });
const port = process.env.PORT;

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images"); 
  },
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + file.originalname;
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
app.use(multer({ storage: storage, fileFilter: fileFilter }).array("image"));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(authRouter);
app.use(roleRouter);
app.use(hostelRouter);

db();

app.listen(port, () => {
  console.log(`connected to localhost:${port}`);
});
