const app = angular.module('myApp')

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/')

    $stateProvider
        .state('inicio', {
            url: '/',
            templateUrl: 'views/home.html',
            controller: 'homeCtrl',
            controllerAs: 'vm',
            data: {
                'meta': {
                    'og:image': 'http://clanpauamarelo.com/images/logo.png',
                    'title': 'PAU AMARELO | O Maior Clan da Parte Sul/Sudeste do Brasil'
                }
            }
        })
        .state('galeria', {
            url: '/galeria',
            templateUrl: 'views/galeria.html',
            controller: 'galeriaCtrl',
            controllerAs: 'vm',
            data: {
                'meta': {
                    'og:image': 'http://clanpauamarelo.com/images/logo.png',
                    'title': 'Galeria | PAU AMARELO'
                }
            }
        })
        .state('noticias', {
            url: '/noticias',
            templateUrl: 'views/noticias.html',
            controller: 'noticiasCtrl',
            controllerAs: 'vm',
            data: {
                'meta': {
                    'og:image': 'http://clanpauamarelo.com/images/logo.png',
                    'title': 'Notícias | PAU AMARELO'
                }
            }
        })
        .state('noticia', {
            url: '/noticia/:url',
            templateUrl: 'views/noticia.html',
            controller: 'noticiaCtrl',
            controllerAs: 'vm',
            data: {
                'meta': {
                    'og:image': 'http://clanpauamarelo.com/images/logo.png',
                    'title': 'PAU AMARELO',
                    'author': 'PAU AMARELO'
                }
            }
        })
        .state('partidas', {
            url: '/partidas',
            templateUrl: 'views/partidas.html',
            controller: 'partidasCtrl',
            controllerAs: 'vm',
            data: {
                'meta': {
                    'title': 'Partidas | PAU AMARELO'
                }
            }
        })

    $locationProvider.html5Mode(true)
})