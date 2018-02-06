// show loading image
$('#loader').show();

// main image loaded ?
$('img').on('load', function(){
  // hide/remove the loading image
  $('#loader').hide();
});