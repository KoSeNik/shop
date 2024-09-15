require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const cors = require("cors");
const PORT = require("./constants/port");

const path = require("path");

const app = express();

app.use(express.static("../frontend/build"));

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/images", express.static(path.join(__dirname, "upload/images")));
app.use("/", routes);

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
