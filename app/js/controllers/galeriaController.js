(function() {
    'use strict'

    const app = angular.module('myApp')

    app.controller("galeriaCtrl", function($scope, $http, config) {
        const vm = this

        $(document).ready(function(){
            setTimeout(() => {
                $('.sidenav').sidenav()
                $('.parallax').parallax()
                $('.materialboxed').materialbox()
            }, 300)
        })

        function listar() {
            $http.get(config.galeria)
            .then(function(response) {
                vm.galeria = response.data.data
            })
        }
        listar()

        function listarIntegrantes() {
            $http.get(config.integrantes)
            .then((response) => {
                vm.integrantes = response.data.data
            })
        }
        listarIntegrantes()

        vm.playerActive = ''
        vm.filtrar = function(obj) {
            vm.playerActive = obj.nick
        }
    })
})()