const express = require ('express');
const router = express.Router();
const koolController = require('../controllers/koolController')

router.get('/', koolController.homePage);

router.get('/koolduct', koolController.koolDuct);
router.get('/supply', koolController.supply);
router.get('/services', koolController.services);
router.get('/contact', koolController.contact);

module.exports = router;