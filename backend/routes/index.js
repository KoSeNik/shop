const express = require("express");

const router = express.Router({ mergeParams: true });

router.use("/", require("./auth"));
router.use("/products", require("./product"));
router.use("/users", require("./user"));
router.use("/carts", require("./cart"));

module.exports = router;
