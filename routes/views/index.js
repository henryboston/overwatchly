var keystone = require('keystone'),
	moment = require('moment'),
	async = require('async');

var Meetup = keystone.list('Meetup'),
	Post = keystone.list('Post'),
	RSVP = keystone.list('RSVP');
	//Featured = keystone.list('Featured');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	locals.section = 'home';
	locals.meetup = {};
	locals.page.title = 'Overwatchly';
	
	locals.rsvpStatus = {};

	locals.user = req.user;

	locals.filters = {
		category: req.params.category
	};
	locals.data = {
		posts: [],
		categories: [],
		featured: [],
		main: []
	};
	
	// Load the first, NEXT meetup
	
	view.on('init', function(next) {
		Meetup.model.findOne()
			.where('state', 'active')
			.sort('-startDate')
			.exec(function(err, activeMeetup) {
				locals.activeMeetup = activeMeetup;
				next();
			});
			
	});
	
	
	// Load the first, PAST meetup
	
	view.on('init', function(next) {
		Meetup.model.findOne()
			.where('state', 'past')
			.sort('-startDate')
			.exec(function(err, pastMeetup) {
				locals.pastMeetup = pastMeetup;
				next();
			});
			
	});
	
	
	// Load an RSVP
	
	view.on('init', function(next) {

		if (!req.user || !locals.activeMeetup) return next();
		
		RSVP.model.findOne()
			.where('who', req.user._id)
			.where('meetup', locals.activeMeetup)
			.exec(function(err, rsvp) {
				locals.rsvpStatus = {
					rsvped: rsvp ? true : false,
					attending: rsvp && rsvp.attending ? true : false
				}
				return next();
			});
			
	});
	
	// Decide which to render
	
	view.on('render', function(next) {
		
		locals.meetup = locals.activeMeetup || locals.pastMeetup;
		if (locals.meetup) {
			locals.meetup.populateRelated('talks[who] rsvps[who]', next);
		} else {
			next();
		}
		
	});

	// Load all categories
	view.on('init', function(next) {
		
		keystone.list('PostCategory').model.find().sort('name').exec(function(err, results) {
			
			if (err || !results.length) {
				return next(err);
			}
			
			locals.data.categories = results;
			
			// Load the counts for each category
			async.each(locals.data.categories, function(category, next) {
				
				keystone.list('Post').model.count().where('category').in([category.id]).exec(function(err, count) {
					category.postCount = count;
					next(err);
				});
				
			}, function(err) {
				next(err);
			});
			
		});
		
	});
	
	//Load the current category filter
	view.on('init', function(next) {
		
		if (req.params.category) {
			keystone.list('PostCategory').model.findOne({ key: locals.filters.category }).exec(function(err, result) {
				locals.data.category = result;
				next(err);
			});
		} else {
			next();
		}
		
	});
	
	// Load the posts
	view.on('init', function(next) {
		
		var q = keystone.list('Post').model.find().where('state', 'featured').sort('-publishedDate').populate('author categories');
		
		if (locals.data.category) {
			q.where('categories').in([locals.data.category]);
		}
		
		q.exec(function(err, results) {
			locals.data.featured = results;
			next(err);
		});
		
	});

	// Load the posts
	view.on('init', function(next) {
		
		var q = keystone.list('Post').model.find().where('state', 'main').sort('-publishedDate').populate('author categories');
		
		if (locals.data.category) {
			q.where('categories').in([main]);
		}
		
		q.exec(function(err, results) {
			locals.data.main = results;
			next(err);
		});
		
	});

	// Load the posts
	view.on('init', function(next) {
		
		var q = keystone.list('Post').model.find().where('state', 'published').sort('-publishedDate').populate('author categories');
		
		if (locals.data.category) {
			q.where('categories').in([locals.data.category]);
		}
		
		q.exec(function(err, results) {
			locals.data.posts = results;
			next(err);
		});
		
	});
	
	view.render('site/index');
	
}
