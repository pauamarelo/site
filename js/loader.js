jQuery(window).on('load', function() {
	$('#loader').show();
	$('.materialboxed').load(function(){
		$('#loader').hide();
	});
});