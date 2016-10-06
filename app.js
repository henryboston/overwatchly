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
    name: 'mich',
    description: 'mich',
    help: 'help for mich',
    handle: mich
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

function mich (message) {
    bot.sendMessage(message, 'Filthy casual who luvs to spam discord and RP as a druid in his spare time');
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
 
var bot = new discordbot({ commands: commands });
 
bot.connect(auth);