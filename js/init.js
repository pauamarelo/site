$(document).ready(function(){
    //carousel
    $('.carousel').carousel({indicators: true});
    //carousel auto play
    function autoplay() {
        $('.carousel').carousel('next');
        setTimeout(autoplay, 4500);
    };
    autoplay();
    
	//parallax
    $('.parallax').parallax();

	//tabs
	$('ul.tabs').tabs();

    //collapse
    $('.collapsible').collapsible();

    //galeria
    $('.materialboxed').materialbox();
});

//scrollspy
$('#content').pushpin({
    top: $('#content').offset().top 
});
$('.scrollspy').scrollSpy({
    scrollOffset: 64
});

//sidenav
$(".button-collapse").sideNav({
 	menuWidth: 200,
	draggable: true
});

//init wow
new WOW().init();