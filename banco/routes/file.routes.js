const express = require('express');
const router = express.Router();
const file_controller = require("../controllers/file.controller");

router.get('/testar',file_controller.test);

router.post('/saveFile', file_controller.create);

router.get('/findById/:id', file_controller.details);

router.get('/list', file_controller.list);

module.exports = router;

