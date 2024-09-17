const express = require("express");
const {Router} = express;

const router = Router();

const fileController = require('../controllers/fileController');

router.get('/:id', fileController.fileControllerGet);

module.exports = router;

