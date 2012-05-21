$(document).on("pageinit",":jqmData(role='page')", function(){

	$(":jqmData(slidemenu)").addClass('slidemenu_btn');
	var sm = $($(":jqmData(slidemenu)").data('slidemenu'));
	sm.addClass('slidemenu');

	$(document).on("swipeleft",":jqmData(role='page')", function(){
		slidemenu(sm);
	});
	$(document).on("swiperight",":jqmData(role='page')", function(){
		slidemenu(sm);
	});
	$(document).on("click", ":jqmData(slidemenu)", function(event) {
		event.stopImmediatePropagation();
		slidemenu(sm);
	});
	$(document).on("click", "a:not(:jqmData(slidemenu))", function(e) {
		only_close = true;
		slidemenu(sm, only_close);
	});

	$(window).on('resize', function(){

		if ($(":jqmData(slidemenu)").data('slideopen')) {

			var sm = $($(":jqmData(slidemenu)").data('slidemenu'));
			var w = '240px';

			sm.css('width', w);
			sm.height(viewport().height);

			$(":jqmData(role='page')").css('left', w);
		}

	});

});

function slidemenu(sm, only_close) {

	sm.height(viewport().height);

	if (!$(this).data('slideopen') && !only_close) {

		sm.show();
		var w = '240px';
		sm.animate({width: w, avoidTransforms: false, useTranslate3d: true}, 'fast');
		$(":jqmData(role='page')").css('left', w);
		$(this).data('slideopen', true);

		if ($(":jqmData(role='header')").data('position') == 'fixed') {
			$(":jqmData(slidemenu)").css('margin-left', parseInt(w.split('px')[0]) + 10 + 'px');
		} else {
			$(":jqmData(slidemenu)").css('margin-left', '10px');
		}

	} else {
		var w = '0px';
		sm.animate({width: w, avoidTransforms: false, useTranslate3d: true}, 'fast', function(){sm.hide()});
		$(":jqmData(role='page')").css('left', w);
		$(this).data('slideopen', false);
		$(":jqmData(slidemenu)").css('margin-left', '0px');
	}
}

function viewport(){
	var e = window;
	var a = 'inner';
	if (!('innerWidth' in window)) {
		a = 'client';
		e = document.documentElement || document.body;
	}
	return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
}
