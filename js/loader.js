jQuery(document).ready(function() {
	$('#loader').show();
	$('.materialboxed').load(function(){
		$('#loader').hide();
	});
});