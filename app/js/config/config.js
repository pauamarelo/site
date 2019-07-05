const app = angular.module('myApp')

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state("inicio", {
            url: "/",
            templateUrl: "views/home.html",
            controller: "homeCtrl",
            controllerAs: "vm"
        })
        .state("galeria", {
            url: "/galeria",
            templateUrl: "views/galeria.html",
            controller: "galeriaCtrl",
            controllerAs: "vm"
        })
        .state("noticias", {
            url: "/noticias",
            templateUrl: "views/noticias.html",
            controller: "noticiasCtrl",
            controllerAs: "vm"
        })
        .state("noticia", {
            url: "/noticia/:url",
            templateUrl: "views/noticia.html",
            controller: "noticiaCtrl",
            controllerAs: "vm"
        });

    $locationProvider.html5Mode(true);
})