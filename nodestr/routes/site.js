const express = require("express");
const router = express.Router();

const controller = require("../controllers/site.controller");


router.route('/home').get(controller.home)
router.route('/about').get(controller.about)


module.exports = router;