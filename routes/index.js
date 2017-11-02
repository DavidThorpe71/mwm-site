const express = require ('express');
const router = express.Router();
const koolController = require('../controllers/koolController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', koolController.homePage);


router.get('/koolduct', koolController.koolDuct);
router.get('/supply', catchErrors(koolController.getPhotos));
router.get('/services', koolController.services);
router.get('/contact', koolController.contact);

router.get('/add', koolController.addPhoto);
router.post('/add', 
	koolController.upload,
	catchErrors(koolController.resize),
	catchErrors(koolController.createPhoto)
);

router.post('/add/:id', 
	koolController.upload,
	catchErrors(koolController.resize),
	catchErrors(koolController.updatePhoto)
);

router.get('/supply/:id/edit', catchErrors(koolController.editPhoto));

router.get('/supply/:slug', catchErrors(koolController.getPhotoBySlug));

module.exports = router;