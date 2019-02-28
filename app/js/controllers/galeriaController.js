(function() {
    'use strict'

    const app = angular.module('myApp')

    app.controller("galeriaCtrl", function($scope, $http, config) {
        const vm = this

        //Array galeria
        $http.get(config.galeriaConst)
        .then(function(response) {
            vm.galeria = response.data.lista
        })
    })
})()