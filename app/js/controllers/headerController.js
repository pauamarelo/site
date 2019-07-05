(function() {
    'use strict'

    const app = angular.module('myApp')

    app.controller("headerCtrl", function($scope, $timeout, $state) {
        const vm = this

        vm.goToSection = function(id) {
            if($state.is('inicio')) {
                if(!id) {
                    $('html, body').animate({
                        scrollTop: 0
                    }, 300)
                } else {
                    $('html, body').animate({
                        scrollTop: $(id).offset().top - 60
                    }, 300)
                }
            } else {
                $state.go('inicio')
                $('html, body').animate({
                    scrollTop: $(id).offset().top - 60
                }, 300)
            }
        }
    })
})()