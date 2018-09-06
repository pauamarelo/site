var app = angular.module("myApp", ["ui.router", "ngSanitize", "ui.materialize", "duScroll", "angularLazyImg"]);
app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state("inicio", {
            url: "/",
            templateUrl: "views/home.html",
            controller: "homeCtrl"
        })
        .state("galeria", {
            url: "/galeria",
            templateUrl: "views/galeria.html",
            controller: "galeriaCtrl"
        })
        .state("noticias", {
            url: "/noticias",
            templateUrl: "views/noticias.html",
            controller: "noticiasCtrl"
        })
        .state("noticia", {
            url: "/noticia/:url",
            templateUrl: "views/noticia.html",
            controller: "noticiaCtrl"
        });

    $locationProvider.html5Mode(true);
});
app.value('duScrollOffset', 50);

app.run(function($rootScope, $http, $transitions, $location, $timeout) {
    $transitions.onEnter({}, function () { //mantém sempre no topo (obrigatório no uso do ui-router)
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        $('body').addClass('animated fadeIn')
    });
    $transitions.onExit({}, function () {
        $('body').removeClass('animated fadeIn')
    });

    new WOW().init();

    $rootScope.isActive = function (viewLocation) {
        var active = (viewLocation === $location.path());
        return active;
    };
    //Carrega o script jQuery
    // $rootScope.load = function() {
    //    var init = document.createElement('script');
    //    init.type = 'text/javascript';
    //    init.src = "js/init.js";
    //    document.body.appendChild(init);
    // };
    // $rootScope.load();
    // $(document).ready(function() {
    //     var init = document.createElement('script');
    //     init.type = 'text/javascript';
    //     init.src = "js/init.js";
    //     document.body.appendChild(init);
    // });
});

app.controller("headerCtrl", function($scope, $location, $timeout, $state) {
    $scope.goToTop = function() {
        if ($location.path() === '/') {
            $('html, body').animate({
                scrollTop: 0
            }, 300);
        } else {
            $state.go('inicio');
        }
    };

    $scope.goToLine = function() {
        if ($location.path() === '/') {
            $('html, body').animate({
                scrollTop: $("#line").offset().top - 60
            }, 300);
        } else {
            $state.go('inicio');
            $timeout(function () {
                $('html, body').animate({
                    scrollTop: $("#line").offset().top - 60
                }, 300);
            }, 50)
        }
    };

    $scope.goToMapa = function() {
        if ($location.path() === '/') {
            $('html, body').animate({
                scrollTop: $("#mapa").offset().top - 60
            }, 300);
        } else {
            $state.go('inicio');
            $timeout(function () {
                $('html, body').animate({
                    scrollTop: $("#mapa").offset().top - 60
                }, 300);
            }, 50)
        }
    };

    $scope.goToPeneira = function() {
        if ($location.path() === '/') {
            $('html, body').animate({
                scrollTop: $("#peneira").offset().top - 60
            }, 300);
        } else {
            $state.go('inicio');
            $timeout(function() {
                $('html, body').animate({
                    scrollTop: $("#peneira").offset().top - 60
                }, 300);
            }, 50)
        }
    };
});

app.controller("footerCtrl", function($scope) {
    $scope.hoje = new Date().getFullYear();
});

app.controller("homeCtrl", function($scope, $http) {
    $scope.hoje = new Date().getFullYear();

    //array players
    $http.get('json/players.json')
    .then(function(response) {
        $scope.players = response.data.lista;
    });
    //array ex-integrantes
    $http.get('json/kicked.json')
    .then(function(response) {
        $scope.exIntegrantes = response.data.lista;
    });
    //array requisitos peneira
    $http.get('json/requisitos.json')
    .then(function(response) {
        $scope.requisitos = response.data.lista;
    });
    //array requisitos peneira
    $http.get('json/patentes.json')
    .then(function(response) {
        $scope.patentes = response.data.lista;
    });

	$scope.dados = {};
    $scope.mapa = [];
    $scope.carousel = false;

    $scope.carrega = function() {        
        //carousel
        $http.get('json/mapa.json')
        .then(function(response) {
            $scope.mapa = response.data.lista;
            $scope.carousel = true;
            console.log('carousel: ', $scope.mapa);
        });
    }
    $scope.carrega();

	$scope.pegaDados = function(user) {
		$scope.dados = user;
	}

    //tabs
	$scope.tab = 1;
    $scope.setTab = function (tabId) {
        $scope.tab = tabId;
    };
    $scope.isSet = function (tabId) {
        return $scope.tab === tabId;
    };


	//pulse
	$(document).ready(function() {
		var width = $(window).width();
	    if (width > 768) {
	    	//brd
	       	$("#brd").mouseover(function(){
	            $("#brd a").addClass("pulse");
	        });
	        $("#brd").mouseout(function(){
	            $("#brd a").removeClass("pulse");
	        });

	        //ldo
	        $("#ldo").mouseover(function(){
                $("#ldo a").addClass("pulse");
            });
            $("#ldo").mouseout(function(){
                $("#ldo a").removeClass("pulse");
            });

            //familton
            $("#familton").mouseover(function(){
                $("#familton a").addClass("pulse");
            });
            $("#familton").mouseout(function(){
                $("#familton a").removeClass("pulse");
            });

            //chapeleiro
            $("#chapeleiro").mouseover(function(){
                $("#chapeleiro a").addClass("pulse");
            });
            $("#chapeleiro").mouseout(function(){
                $("#chapeleiro a").removeClass("pulse");
            });

            //upk
            $("#upk").mouseover(function(){
                $("#upk a").addClass("pulse");
            });
            $("#upk").mouseout(function(){
                $("#upk a").removeClass("pulse");
            });
	    }
	})
});

app.controller("galeriaCtrl", function($scope, $http) {
    //Array galeria
    $http.get('json/galeria.json')
    .then(function(response) {
        $scope.galeria = response.data.lista;
    })
});

app.controller("noticiasCtrl", function($scope, $http) {
    $scope.dados = {};
    $scope.retorno = {};
    var url = 'http://pauamarelo.esy.es/controller';

    // $http.get('json/noticias.json')
    // .then(function(response) {
    //     $scope.noticias = response.data.lista;
    // })

    // Listar notícias
    $scope.listar = function () {
        $http.get(url+'/listar.php')
        .then(function onSuccess(response) {
            // $scope.user_list = response.data.user_data;
            $scope.noticias = response.data;

            console.log('lista: ', response);
        });
    };
    $scope.listar();
});

app.controller("noticiaCtrl", function($scope, $http, $stateParams) {
    $scope.dados = {};
    $scope.retorno = {};
    var url = Number($stateParams.url);
    

    $http.get('json/noticias.json')
    .then(function(response) {
        $scope.noticias = response.data.lista;

        $scope.noticia = $scope.noticias.filter(function(user) {
            return user.idNoticia === url;
        })[0];
        console.log('teste', $scope.noticia);
    })



    // Disqus
    var disqus_config = function () {
        this.page.url = $scope.noticia.idNoticia;  // Replace PAGE_URL with your page's canonical URL variable
        this.page.identifier = $scope.noticia.idNoticia; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };
    (function() { // DON'T EDIT BELOW THIS LINE
        var d = document, s = d.createElement('script');
        s.src = 'https://pauamarelo-1.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    })();
});

//############## FILTERS ##############//
app.filter('limiteTitulo', function() {
    var caracteres = 50;
    return function (input) {
        if (input.length <= caracteres) return input;
        var output = input.substring(0, caracteres) + "...";
        return output;
    };
});

app.filter('limite', function() {
    var caracteres = 120;
    return function (input) {
        if (input.length <= caracteres) return input;
        var output = input.substring(0, caracteres) + "...";
        return output;
    };
});
