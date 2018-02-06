$('#loader').show();
jQuery(window).on('load', function() {
	$('.materialboxed').load(function(){
		$('#loader').hide();
	});
});