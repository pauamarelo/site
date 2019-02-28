(function() {
    'use strict'

    const app = angular.module('myApp')

    app.controller("headerCtrl", function($scope, $timeout, $state) {
        const vm = this

        vm.goToTop = function() {
            if ($state.is('inicio')) {
                $('html, body').animate({
                    scrollTop: 0
                }, 300)
            } else {
                $state.go('inicio')
            }
        }
    
        vm.goToLine = function() {
            if ($state.is('inicio')) {
                $('html, body').animate({
                    scrollTop: $("#line").offset().top - 60
                }, 300)
            } else {
                $state.go('inicio')
                $timeout(function () {
                    $('html, body').animate({
                        scrollTop: $("#line").offset().top - 60
                    }, 300)
                }, 50)
            }
        }
    
        vm.goToMapa = function() {
            if ($state.is('inicio')) {
                $('html, body').animate({
                    scrollTop: $("#mapa").offset().top - 60
                }, 300)
            } else {
                $state.go('inicio')
                $timeout(function () {
                    $('html, body').animate({
                        scrollTop: $("#mapa").offset().top - 60
                    }, 300)
                }, 50)
            }
        }
    
        vm.goToPeneira = function() {
            if ($state.is('inicio')) {
                $('html, body').animate({
                    scrollTop: $("#peneira").offset().top - 60
                }, 300)
            } else {
                $state.go('inicio')
                $timeout(function() {
                    $('html, body').animate({
                        scrollTop: $("#peneira").offset().top - 60
                    }, 300)
                }, 50)
            }
        }
    })
})()