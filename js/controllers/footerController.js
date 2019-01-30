(function() {
    'use strict'

    var app = angular.module('myApp')

    app.controller("footerCtrl", function($scope) {
        const vm = this

        vm.hoje = new Date().getFullYear()
    })
})()