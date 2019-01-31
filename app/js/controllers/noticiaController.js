(function() {
    'use strict'

    const app = angular.module('myApp')

    app.controller("noticiaCtrl", function($scope, $http, $stateParams, $location) {
        const vm = this

        const base = 'http://pauamarelo.000webhostapp.com/@/'
    
        vm.dados = {}
        vm.retorno = {}
        const url = $stateParams.url
        const shortname = 'pauamarelo-1'

        vm.link = $location.absUrl()
        
        function listar() {
            $http.get(base+'controller/listar.php')
            .then(function(response) {
                vm.noticias = response.data
        
                vm.noticia = vm.noticias.filter(function(user) {
                    return user.urlNoticia === url
                })[0]

                vm.disqusConfig = {
                    disqus_shortname: shortname,
                    disqus_identifier: vm.noticia.urlNoticia,
                    // disqus_url: 'http://clanpauamarelo.com/noticia/'+url
                    disqus_url: $location.absUrl()
                }
            })
        }
        listar()
    })
})()