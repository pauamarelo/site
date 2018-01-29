$(document).ready(function(){
	//parallax
    $('.parallax').parallax();

    //carousel
    $('.carousel').carousel({indicators: true});
    // Next slide
	$('.carousel').carousel('next');
	$('.carousel').carousel('next', 3); // Move next n times.

	//tabs
	$('ul.tabs').tabs();

    //collapse
    $('.collapsible').collapsible();

	//pulse
    $(window).resize(function(){
        console.log('resize called');
        var width = $(window).width();
        if(width > 960){
            $(".brd").mouseover(function(){
                $(".brd a").addClass("pulse");
            });
            $(".brd").mouseout(function(){
                $(".brd a").removeClass("pulse");
            });
        }
    })
    .resize();//trigger the resize event on page load.
    //ido
    $(window).resize(function(){
        console.log('resize called');
        var width = $(window).width();
        if(width > 960){
            $(".ido").mouseover(function(){
                $(".ido a").addClass("pulse");
            });
            $(".ido").mouseout(function(){
                $(".ido a").removeClass("pulse");
            });
        }
    })
    .resize();//trigger the resize event on page load.
    //familton
    $(window).resize(function(){
        console.log('resize called');
        var width = $(window).width();
        if(width > 960){
            $(".familton").mouseover(function(){
                $(".familton a").addClass("pulse");
            });
            $(".familton").mouseout(function(){
                $(".familton a").removeClass("pulse");
            });
        }
    })
    .resize();//trigger the resize event on page load.
    //chapeleiro
    $(window).resize(function(){
        console.log('resize called');
        var width = $(window).width();
        if(width > 960){
            $(".chapeleiro").mouseover(function(){
                $(".chapeleiro a").addClass("pulse");
            });
            $(".chapeleiro").mouseout(function(){
                $(".chapeleiro a").removeClass("pulse");
            });
        }
    })
    .resize();//trigger the resize event on page load.
    //upk
    $(window).resize(function(){
        console.log('resize called');
        var width = $(window).width();
        if(width > 960){
            $(".upk").mouseover(function(){
                $(".upk a").addClass("pulse");
            });
            $(".upk").mouseout(function(){
                $(".upk a").removeClass("pulse");
            });
        }
    })
    .resize();//trigger the resize event on page load.

    //modal
    $('#modal1').modal();
    //ido
    $('#modal2').modal();
    //familton
    $('#modal3').modal();
    //chapeleiro
    $('#modal4').modal();
    //upk
    $('#modal5').modal();
    //ex-integrantes
    $('#modal6').modal();

    //galeria
    $('.materialboxed').materialbox();
});

//carousel auto play
autoplay()   
function autoplay() {
    $('.carousel').carousel('next');
    setTimeout(autoplay, 4500);
};

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