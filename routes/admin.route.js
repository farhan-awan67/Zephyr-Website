const express = require("express");
const router = express.Router();
const errorHandling = require("../errorHandling");
const { adminPage } = require("../controllers/adminController");


router.get("/dashboard", adminPage);

router.use(errorHandling);

module.exports = router;