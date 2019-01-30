(function() {
    'use strict'

    var app = angular.module('myApp')

    app.controller("headerCtrl", function($scope, $timeout, $state) {
        $scope.goToTop = function() {
            if ($state.is('inicio')) {
                $('html, body').animate({
                    scrollTop: 0
                }, 300)
            } else {
                $state.go('inicio')
            }
        }
    
        $scope.goToLine = function() {
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
    
        $scope.goToMapa = function() {
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
    
        $scope.goToPeneira = function() {
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