const express = require ('express');
const router = express.Router();
const koolController = require('../controllers/koolController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', koolController.homePage);


router.get('/koolduct', koolController.koolDuct);
router.get('/supply', catchErrors(koolController.getPhotos));
router.get('/services', koolController.services);
router.get('/contact', koolController.contact);

router.get('/add',
	authController.isLoggedIn,
	koolController.addPhoto
);
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

router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/register',
	authController.isLoggedIn,
	userController.registerForm
);

router.post('/register', 
	userController.validateRegister,
	userController.register,
	authController.login
);

router.get('/logout', authController.logout);

router.get('/account',
	authController.isLoggedIn,
	userController.account
);
router.post('/account', catchErrors(userController.updateAccount));
router.post('/account/forgot', catchErrors(authController.forgot));
router.get('/account/reset/:token', catchErrors(authController.reset));
router.post('/account/reset/:token', 
	authController.confirmedPasswords,
	catchErrors(authController.update)
);

module.exports = router;