const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "upload/images",

  filename: (req, file, cb) => {
    const uniq = `${Date.now()}`;
    const extention = path.extname(file.originalname);
    cb(null, `${file.fieldname}_${uniq}${extention}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
