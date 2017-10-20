exports.homePage = (req, res) => {
	res.render('index', { title: 'MW Metalworks' });
};

exports.koolDuct = (req, res) => {
	res.render('koolduct', { title: 'Koolduct' });
};

exports.supply = (req, res) => {
	res.render('supply', { title: 'Supply & Install' });
};

exports.services = (req, res) => {
	res.render('services', { title: 'Services' });
};

exports.contact = (req, res) => {
	res.render('contact', { title: 'Contact' });
};