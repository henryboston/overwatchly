// Load the babel-register plugin for the graphql directory
// Note this checks the regex against an absoloute path
require('babel-register')({ only: /\/graphql\/.*/ });

// Load .env config for development environments
require('dotenv').config({ silent: true });

// Initialise New Relic if an app name and license key exists
if (process.env.NEW_RELIC_APP_NAME && process.env.NEW_RELIC_LICENSE_KEY) {
	require('newrelic');
}

/**
 * Application Initialisation
 */

var keystone = require('keystone');
var pkg = require('./package.json');

keystone.init({

	'name': 'Overwatchly',
	'brand': 'Overwatchly',
	'back': '/me',

	'favicon': 'public/favicon.ico',
	'less': 'public',
	'static': 'public',

	'views': 'templates/views',
	'view engine': 'jade',
	'view cache': true,

	'emails': 'templates/emails',

	'auto update': true,
	'mongo': process.env.MONGO_URI || 'mongodb://localhost/' + pkg.name,

	'session': true,
	'session store': 'mongo',
	'auth': true,
	'user model': 'User',
	'cookie secret': process.env.COOKIE_SECRET || 'sydjs',

	'mandrill api key': process.env.MANDRILL_KEY,

	'google api key': process.env.GOOGLE_BROWSER_KEY,
	'google server api key': process.env.GOOGLE_SERVER_KEY,

	'ga property': 'UA-80395833-1',
	'ga domain': 'overwatchly.com',

	'chartbeat property': process.env.CHARTBEAT_PROPERTY,
	'chartbeat domain': process.env.CHARTBEAT_DOMAIN,

	'wysiwyg additional plugins': 'images',
	'wysiwyg images': true,
	'wysiwyg cloudinary images': true,
  	'wysiwyg additional buttons': 'images',
  	'wysiwyg additional plugins': 'paste',
	'wysiwyg additional options': {
	 	'paste_data_images': true,
	 	'extended_valid_elements':'script[language|type|src],style[type]',
	 },

	'basedir': __dirname

});

keystone.import('models');

keystone.set('routes', require('./routes'));

keystone.set('locals', {
	_: require('lodash'),
	moment: require('moment'),
	js: 'javascript:;',
	env: keystone.get('env'),
	utils: keystone.utils,
	plural: keystone.utils.plural,
	editable: keystone.content.editable,
	google_api_key: keystone.get('google api key'),
	ga_property: keystone.get('ga property'),
	ga_domain: keystone.get('ga domain'),
	chartbeat_property: keystone.get('chartbeat property'),
	chartbeat_domain: keystone.get('chartbeat domain')
});

keystone.set('email locals', {
	utils: keystone.utils,
	host: (function() {
		if (keystone.get('env') === 'staging') return 'http://overwatchly.herokuapp.com';
		if (keystone.get('env') === 'production') return 'http://www.overwatchly.com';
		return (keystone.get('host') || 'http://localhost:') + (keystone.get('port') || '3000');
	})()
});

keystone.set('nav', {
	'meetups': ['meetups', 'talks', 'rsvps'],
	'members': ['users', 'organisations'],
	'posts': ['posts', 'post-categories', 'post-comments'],
	'links': ['links', 'link-tags', 'link-comments']
});

// app.js
var discordbot = require('simple-discord-bot'),
    auth = require('./auth.json');
 
var subclubnum = 0;

var commands = [{
    name: 'stjern',
    description: 'Stjerns Rogue Guide',
    help: 'help for greet',
    handle: stjern
},
{

    name: 'simc',
    description: 'Sim Yourself',
    help: 'help for sim',
    handle: simc,
},
{
    name: 'stats',
    description: 'Stats',
    help: 'help for stats',
    handle: stats,
},
{
    name: 'followers',
    description: 'Followers',
    help: 'help for Followers',
    handle: followers,
},
{
    name: 'aethys',
    description: 'Aethys',
    help: 'help for aethys',
    handle: aethys
},
{
    name: 'channel',
    description: 'channel',
    help: 'help for channel',
    handle: channel
},
{
    name: 'artifact',
    description: 'artifact',
    help: 'help for artifact',
    handle: artifact
},
{
    name: 'enchants',
    description: 'enchants',
    help: 'help for enchants',
    handle: enchants
},
{
    name: 'brambles',
    description: 'brambles',
    help: 'help for mich',
    handle: brambles
},
{
    name: 'subclub',
    description: 'subclub',
    help: 'subclub',
    handle: subclub
},
{
    name: 'skasch',
    description: 'skasch',
    help: 'skasch',
    handle: skasch
},
{
    name: 'furple',
    description: 'furple',
    help: 'furple',
    handle: furple
},
{
    name: 'best',
    description: 'best',
    help: 'best',
    handle: best
},
{
    name: 'faq',
    description: 'faq',
    help: 'faq',
    handle: faq
}
];
 
function stjern (message) {
    bot.sendMessage(message, '**Stjerns Rogue Guide: <https://goo.gl/c8ntLu>**');
}

function simc (message) {
    bot.sendMessage(message, '**How To Sim Yourself: <https://goo.gl/YACUkz> Download SimulationCraft at https://simulationcraft.org/**');
}

function stats (message) {
    bot.sendMessage(message, '**You should Sim yourself to find stat weights: <https://goo.gl/YACUkz>**');
}

function followers (message) {
    bot.sendMessage(message, '**Follower Chart (not that it matters): <https://goo.gl/KwuHgF>**');
}

function aethys (message) {
    bot.sendMessage(message, '**Aethys Updated Sim Results: <https://goo.gl/VSjNfw>**');
}

function channel (message) {
    bot.sendMessage(message, 'That question should go in #simple-questions, #general, or #general-moderated');
}

function artifact (message) {
    bot.sendMessage(message, 'Outlaw: <https://goo.gl/sdu2qo> Assassination: <https://goo.gl/p1c7wG> Subtlety MS: <https://goo.gl/6b4Y4Z> Subtlety OS: <https://goo.gl/KEJuZx>');
}

function enchants (message) {
    bot.sendMessage(message, '**Q: What are the best enchants?** Neck: Mark of the Hidden Satyr, Cloak: Binding of Agility, Ring: Depends on spec and personal stat weights. Sim yourself.');
}


function brambles (message) {
    bot.sendMessage(message, 'Brambles: the only reason rogues get invited to raid Emerald Nightmare');
}

function subclub (message) {
	subclubnum = subclubnum + 1;
    bot.sendMessage(message, " Currently " + subclubnum + " members in the !subclub '''⌐(ಠ۾ಠ)¬'''");
}

function skasch (message) {
    bot.sendMessage(message, '**Skasch Sims:** <https://simc.skasch.com/>');
}

function furple (message) {
    bot.sendMessage(message, 'I read on the internet I shouldnt trust Furple and he is an asshole <http://i.imgur.com/LhIHO0N.png> p.s. who is the real furple <http://i.imgur.com/dbvpeM2.png>' );
}

function best (message) {
    bot.sendMessage(message, 'Reaves is dead I have replaced him. Go cry me a river.' );
}

function faq (message) {
    bot.sendMessage(message, 'we have a #resources-and-faq channel https://i.imgflip.com/1azeky.jpg' );
}
 
var bot = new discordbot({ commands: commands });
 
bot.connect(auth);

keystone.start();
