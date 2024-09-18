const express = require("express");
const {Router} = express;
const multer = require('multer');
const storage = multer.memoryStorage();
const folderController = require('../controllers/folderController');



const router = Router();
const upload = multer({storage: storage});


router.get('/', folderController.folderControllerget);
router.get('/:id', folderController.folderControllerGetWithID);
router.post('/:id', upload.single('file'), folderController.folderControllerPostWithID);


module.exports = router;


