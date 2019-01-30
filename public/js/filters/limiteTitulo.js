(function() {
    'use strict'

    var app = angular.module('myApp')

    app.filter('limiteTitulo', function() {
        var caracteres = 50
        return function (input) {
            if (input.length <= caracteres) return input
            var output = input.substring(0, caracteres) + "..."
            return output
        }
    })
})()