const express = require ('express');
const router = express.Router();
const koolController = require('../controllers/koolController')

router.get('/', koolController.homePage);

module.exports = router;