(function() {
    'use strict'

    const app = angular.module('myApp')

    app.controller("galeriaCtrl", function($scope, $http) {
        const vm = this

        //Array galeria
        $http.get('json/galeria.json')
        .then(function(response) {
            vm.galeria = response.data.lista
        })
    })
})()