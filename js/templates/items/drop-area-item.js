var dropAreaItem =

'{{#each options}}' +
'<div class="col-sm-2 col-xs-4">' +
	'<div class="drop-area {{#if never}}never{{/if}}" data-area_id="{{id}}"><span>{{label}}</span></div>' +
'</div>' +
'{{/each}}';

var dropAreaTemplate = Handlebars.compile(dropAreaItem);