(function() {
    'use strict'

    const app = angular.module('myApp')

    app.controller("noticiasCtrl", function($scope, $http, config) {
        const vm = this
    
        vm.loading = false
    
        function listar() {
            vm.loading = true
            $http.get(config.listarNoticiasConst)
            .then(function(response) {
                vm.noticias = response.data
                vm.loading = false
            })
        }
        listar()

        vm.limiteNoticias = 10
        vm.carregar = function() {
            vm.limiteNoticias += 10
        }
    })
})()