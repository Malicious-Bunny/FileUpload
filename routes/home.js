const express = require("express");
const {Router} = express;
const homeController = require('../controllers/homeController');


const router = Router();

router.get('/', homeController.homeControllerget);

router.post('/', homeController.homeControllerPost);




module.exports = router;
