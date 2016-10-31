var keystone = require('keystone'),
	async = require('async');
	
//var Link = keystone.list('Link');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Init locals
	locals.section = 'Team Builder';
	locals.page.title = 'Overwatch Team Builder - Find the best counters, team compositions for different maps and game modes';
	
	
	
	// Render the view
	view.render('site/teambuilder');
	
}
