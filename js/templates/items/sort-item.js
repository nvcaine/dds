var sortItem =

'{{#each options}}' +
'<div class="sort-item-container">' +
	'<div class="sort-item drop-shadow" data-area_id="{{id}}">' +
		'<span>{{label}}</span>' +
	'</div>' +
'</div>' +
'{{/each}}';

var sortItemTemplate = Handlebars.compile(sortItem);
