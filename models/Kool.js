const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const koolSchema = new mongoose.Schema({
	name
	slug
	description
	tags
});

module.exports = mongoose.model('Kool', koolSchema);