const express = require("express");
const router = express.Router();

const multer  = require('multer')
const upload = multer({ dest: 'images' })


const controller = require("../controllers/users.controller");


router.route('/list').get(controller.list)
router.route('/err').get(controller.err)
router.route('/add').post(upload.single('avatar'), controller.add)


module.exports = router;