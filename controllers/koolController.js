const mongoose = require('mongoose');
const Photo = mongoose.model('Photo');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');
const mail = require('../handlers/mail');

const multerOptions = {
	storage: multer.memoryStorage(),
	fileFilter(req, file, next) {
		const isPhoto = file.mimetype.startsWith('image/');
		if (isPhoto) {
			next(null, true);
		} else {
			next({ message: 'That filetype isn\'t allowed!'}, false);
		}
	}
};

exports.homePage = async (req, res) => {
	const photos = await Photo.find({ category: 'Home' });
	res.render('index', { title: 'MW Metalworks', photos });
};

exports.koolDuct = async (req, res) => {
	const photos = await Photo.find({ category: 'Koolduct' });
	res.render('koolduct', { title: 'KoolDuct', photos });
};

exports.services = (req, res) => {
	res.render('services', { title: 'Services' });
};

exports.contact = (req, res) => {
	res.render('contact', { title: 'Contact' });
};

exports.contactForm = async (req, res) => {
	await mail.sendContact({
		name: req.body.name,
		email: req.body.email,
		subject: req.body.subject,
		filename: 'contact-form'
	})
	req.flash('success', 'Thank-you for contacting us!');
	res.redirect('/contact');
}

exports.addPhoto = (req, res) => {
	res.render('editPhoto', { title: 'Add a photo' });
};

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
	// check if there is no new file to resize
	if(!req.file) {
		next(); //skips to next middleware
		return;
	}
	const extension = req.file.mimetype.split('/')[1];
	req.body.photo = `${uuid.v4()}.${extension}`;
	// now we resize
	const photo = await jimp.read(req.file.buffer);
	await photo.resize(800, jimp.AUTO);
	await photo.write(`./public/uploads/${req.body.photo}`);
	//once we have written the photo to filesystem keep going!
	next();
}

exports.createPhoto = async (req, res) => {
	const photo = await (new Photo(req.body)).save();
	req.flash('success', `Successfully added photo - ${photo.name}`)
	res.redirect(`/supply/${photo.slug}`);
};

exports.getPhotos = async (req, res) => {
	const photos = await Photo.find({ category: 'Supply and Install' });
	res.render('supply', { title: 'Supply and Install', photos });
};

exports.editPhoto = async (req, res) => {
	//1. Find store given the ID
	const photo = await Photo.findOne({ _id: req.params.id });
	//TODO: 2. Confirm they are the owner
	//3. Render out edit form so user can update photo
	res.render('editPhoto', { title: 'Edit Photo', photo })
}

exports.updatePhoto = async (req, res) => {
	//find and update photo
	const photo = await Photo.findOneAndUpdate({ _id: req.params.id }, req.body, { 
			new: true, 
			runValidators: true
		}).exec();
	// redirect to photo page and tell them it worked
	req.flash('success', `Sucessfully updated ${photo.name} photo. <a href="/supply/${photo.slug}">View photo page</a>`);
	res.redirect(`/supply/${photo._id}/edit`);
}

exports.getPhotoBySlug = async (req, res, next) => {
	const photo = await Photo.findOne({ slug: req.params.slug });
	if(!photo) return next();
	res.render('supplyPhoto', {photo, title: photo.name });
}