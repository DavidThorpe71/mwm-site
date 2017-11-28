const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const promisify = require('es6-promisify');

const transportReset = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS
	}
});

const generateHTML = (filename, options = {}) => {
	const html = pug.renderFile(`${__dirname}/../views/email/${filename}.pug`, options);
	const inlined = juice(html);
	return inlined;
}

exports.sendReset = async (options) => {
	const html = generateHTML(options.filename, options);
	const text = htmlToText.fromString(html);

	const mailOptions = {
		from: 'MW Metalworks <noreply@mwmetalworks.com',
		to: options.user.email,
		subject: options.subject,
		html,
		text
	}
	const sendMail = promisify(transportReset.sendMail, transportReset);
	return sendMail(mailOptions);
}

const transportContact = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS		
	}
});

exports.sendContact = async (options) => {
	const html = generateHTML(options.filename, options);
	const text = htmlToText.fromString(html);

	const mailOptions = {
		from: {
			name: options.name,
			address: options.email
		},
		to: 'MW Metalworks <noreply@mwmetalworks.com',
		subject: options.subject,
		
		html,
		text
	}
	const sendMail = promisify(transportContact.sendMail, transportContact);
	return sendMail(mailOptions);
}