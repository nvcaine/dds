var dropped = false;
var currentOptionIndex = 0;

$( function() {
	initDroppables();
	updateDragOption();
});

// show the current draggable element by fading in
// and increase the current element index;
// the data is received from the config file
function updateDragOption() {

	$("#drag-option").hide().html(dragItemTemplate(dragOptions[currentOptionIndex++])).fadeIn();

	initDragOption();
}

// init drag
function initDragOption() {

	$('.drag-item').pep({
		droppable: '.drop-area',
		revert: true,
		// when dragging starts, scale and center the item on the mouse/touch coordinates
		start: function() {
			var offset = $(this.el).offset();
			dropped = false;
			$(this.el).addClass('dragged').css({
				left: (this.startX - offset.left - ($(this.el).height() / 2)) + 'px',
				top: (this.startY - offset.top - ($(this.el).width() / 2)) + 'px'
			});
		},
		revertIf: function(ev, obj) {
			return !this.activeDropRegions.length;
		},
		// if the element is not dropped, scale to initial size and revert position
		stop: function() {
			if(!dropped) {
				$(this.el).removeClass('dragged').css({
					top: this.startEvent.offsetY - 150 + 'px',
					left: this.startEvent.offsetX - 120 + 'px'
				});

				return;
			}

			$(this.el).hide();
			updateDragOption();
		}
	});
}

function initDroppables() {

	// add droppable items templates
	$('#drop-items').html(dropAreaTemplate({options: dropOptions}));

	// init custom event handlers
	$('.drop-area').on('dragover', function(e) {

		$(this).addClass('drop-over');

	}).on('dragout', function(e) {

		$(this).removeClass('drop-over');

	}).on('dropover', function(e) {

		dropped = true;
		$(this).removeClass('drop-over');

		// log the current option id
		console.log($(this).data('area_id'));
	});
}