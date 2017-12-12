//function used to setup the page window and game UI
function optimize(){

	var w_width = $(window).width();
	var w_height = $(window).height();
	var UI_h;

	if(w_width < 320)  
		w_width = 320;

	var UI_top = (w_height - $(".simon").height()) / 2;
	var UI_left = (w_width - $(".simon").width()) / 2;

	$('main .row').css('width', w_width).css('height', w_height);
	$('.simon').css('height', UI_h).css('top', UI_top).css('margin-left', UI_left);

}

//these two function are called when window is ready or resized
$(document).ready(function(){

	optimize();
});

$(window).resize(function(){

	optimize();
});