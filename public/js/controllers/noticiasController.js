(function() {
    'use strict'

    const app = angular.module('myApp')

    app.controller("noticiasCtrl", function($scope, $http) {
        const vm = this

        const base = 'http://pauamarelo.000webhostapp.com/'
    
        vm.dados = {}
        vm.retorno = {}
        vm.loading = false
    
        function listar() {
            vm.loading = true
            $http.get(base+'controller/listar.php')
            .then(function(response) {
                vm.noticias = response.data
                vm.loading = false
            })
        }
        listar()
    })
})()