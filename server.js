const path = require("path");

const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();

app.use(cors());

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./docs"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});
 
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
 const upload = multer({ storage: fileStorageEngine });
 
app.post("/fileUpload", upload.array("docs", 3), (req, res) => {
  console.log(req.files);
  res.send("Multiple Files Upload Success");
});

app.listen(3000);