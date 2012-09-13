$(document).on("pageinit", function(e){

	var activePage = $(e.target);
	var page_id = activePage.attr('id');
	
	$("#"+ page_id +" :jqmData(slidemenu)").addClass('slidemenu_btn');
	var sm = $($("#"+ page_id +" :jqmData(slidemenu)").data('slidemenu'));
	sm.addClass('slidemenu');

	$(document).on("swipeleft",".ui-page-active", function(e){
		slidemenu(sm, false);
		e.stopImmediatePropagation();
		e.preventDefault();
	});
	$(document).on("swiperight",".ui-page-active", function(e){
		slidemenu(sm, false);
		e.stopImmediatePropagation();
		e.preventDefault();
	});
	$(document).on("click", ".ui-page-active :jqmData(slidemenu)", function(e) {
		slidemenu(sm, false);
		e.stopImmediatePropagation();
		e.preventDefault();
	});
	$(document).on("click", "a:not(:jqmData(slidemenu))", function(e) {
		slidemenu(sm, true);
	});

	$(window).on('resize', function(e){

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
		$(".ui-page-active").css('left', w);
		$(this).data('slideopen', true);

		if ($(".ui-page-active :jqmData(role='header')").data('position') == 'fixed') {
			$(".ui-page-active :jqmData(slidemenu)").css('margin-left', parseInt(w.split('px')[0]) + 10 + 'px');
		} else {
			$(".ui-page-active :jqmData(slidemenu)").css('margin-left', '10px');
		}

	} else {
		var w = '0px';
		sm.animate({width: w, avoidTransforms: false, useTranslate3d: true}, 'fast', function(){sm.hide()});
		$(".ui-page-active").css('left', w);
		$(this).data('slideopen', false);
		$(".ui-page-active :jqmData(slidemenu)").css('margin-left', '0px');
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