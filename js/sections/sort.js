var dropped = false;
var currentPosition;
var dropPosition;

$( function() {

	// initialize the draggable elements
	initDragOption();

	// initialize droppable elements
	initDroppables(numDropSortItems);
});

function initDragOption() {

	// add item templates
	$('#drag-options').html(sortItemTemplate({options: sortOptions}));

	// init drag
	$('.sort-item').pep({
		droppable: '.sort-drop-item',
		revert: true,
		start: function() {
			dropped = false;
		},
		// the current mouse/touch position is saved when the dragged element moves
		drag: function(event) {

			// if we're using the mouse
			if(event.pageX !== undefined && event.pageY !== undefined) {
				currentPosition = {top: event.pageY, left: event.pageX};
				return;
			}

			// if no mouse available, a touch event occured
			var touch = event.originalEvent.touches[0];

			currentPosition = {top: touch.pageY, left: touch.pageX};
		},
		stop: function() {
			if(dropped)
				centerInContainer(this.el);
		},
		overlapFunction: checkOverlapping,
		revertIf: function(ev, obj) {
			return !this.activeDropRegions.length;
		},

	});
}

// center the dropped item in the droppable element
function centerInContainer(element) {

	$(element).css({
		top: dropPosition.top - $(element).offset().top - 4 + 'px',
		left: dropPosition.left - $(element).offset().left + 4 + 'px'
	}).removeClass('drop-shadow');
}

// check if the mouse/touch positions overlaps the droppable element
function checkOverlapping($a, $b) {

	var rect1 = $a[0].getBoundingClientRect();

	if(currentPosition === undefined || rect1 === undefined)
		return false;

	return (rect1.left		< currentPosition.left &&
			rect1.right		> currentPosition.left &&
			rect1.top		< currentPosition.top &&
			rect1.bottom	> currentPosition.top);
}

function initDroppables(numDroppableItems) {

	// add droppable items
	for(var i = 0; i < numDroppableItems; i++) {
		$('#drop-options').append(dropSortTemplate({label: (i + 1)}));
	}

	// init custom event handlers
	$('.sort-drop-item').on('dragover', function(e) {

		$(this).addClass('sort-drop-over');

	}).on('dragout', function(e) {

		$(this).removeClass('sort-drop-over');

	}).on('dropover', function(e) {

		dropped = true;
		$(this).removeClass('shadow-inset').removeClass('sort-drop-over');
		dropPosition = {top: $(this).offset().top, left: $(this).offset().left};
	});
}