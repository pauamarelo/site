(function() {
    'use strict'

    const app = angular.module('myApp')

    app.controller('partidasCtrl', function($scope, $http, config) {
        const vm = this

        $(document).ready(function(){
            setTimeout(() => {
                $('.sidenav').sidenav()
                $('.parallax').parallax()
                $('.collapsible').collapsible()
            }, 300)
        })

        vm.partidas = []
        function listar() {
            $http.get(config.partidas)
            .then((response) => {
                vm.partidas = response.data.data
            })
        }
        listar()
    })
})()