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
        });

    $locationProvider.html5Mode(true);
});
app.value('duScrollOffset', 50);

app.run(function($rootScope, $http, $transitions, $location) {
    $transitions.onSuccess({}, function () { //mantÃ©m sempre no topo (obrigatÃ³rio no uso do ui-router)
        document.body.scrollTop = document.documentElement.scrollTop = 0;
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

//############## FILTERS ##############//
app.filter('limite', function() {
    return function (input) {
        if (input.length <= 26) return input;
        var output = input.substring(0,26) + "...";
        return output;
    };
});