jQuery(document).ready(function(){
    $('body').hide();
    $('#loader').prependTo(window);
});

jQuery(window).load(function(){
    $('#loader').remove();
	$('body').show();
});