const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const photoSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: 'Please enter a name for the photo'
	},
	caption: {
		type: String,
		trim: true
	},
	slug: String,
	photo: String,
	created: {
		type: Date,
		default: Date.now
	},
	category: [String]
});

// This section sets the slug
photoSchema.pre('save', async function(next) {
	if (!this.isModified('name')) {
		next(); //skip it
		return; // stops this function from running
	}
	this.slug = slug(this.name);
	// find other records that have a slug of title, title-1, title-2 etc
	const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
	const recordsWithSlug = await this.constructor.find({ slug: slugRegEx });
	if(recordsWithSlug.length) {
		this.slug = `${this.slug}-${recordsWithSlug.length + 1}`;
	}
	next();
});


module.exports = mongoose.model('Photo', photoSchema);