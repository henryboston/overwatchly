var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Links Model
 * ===========
 */

var Link = new keystone.List('Link', {
	map: { name: 'label' },
	track: true,
	autokey: { path: 'slug', from: 'label', unique: true }
});

Link.add({
	label: { type: String, required: true, initial: true },
	href: { type: Types.Url, required: true, initial: true },
	tags: { type: Types.Relationship, ref: 'LinkTag', many: true, initial: true, index: true },
	skill: { type: Number, required: false, initial: true },
	map: { type: Types.Select, options: 'Hanamura, Temple of Anubis, Volskaya Industries, Dorado, Route 66, Watchpoint: Gibraltar, Hollywood, King’s Row, Numbani, Ilios, Lijang Tower, Nepal', index: true, initial: true },
	player: { type: String, required: false, initial: true },
	commentary: { type: Boolean, required: false, initial: false },
	scrim: { type: Boolean, required: false, initial: false },
	description: { type: Types.Markdown, initial: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true }
});


/**
 * Relationships
 * =============
 */

Link.relationship({ ref: 'LinkComment', refPath: 'link', path: 'comments' });


/**
 * Registration
 * ============
 */

Link.defaultColumns = 'label, href, state|20%';
Link.register();
