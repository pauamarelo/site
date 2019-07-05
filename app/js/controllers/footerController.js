(function() {
    'use strict'

    const app = angular.module('myApp')

    app.controller("footerCtrl", function($scope) {
        const vm = this

        vm.hoje = new Date().getFullYear()
    })
})()