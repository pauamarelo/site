(function() {
    'use strict'

    var app = angular.module('myApp')

    app.run(function($rootScope, $transitions, $state) {
        $transitions.onEnter({}, function () { //mantém sempre no topo (obrigatório no uso do ui-router)
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            $('body').addClass('animated fadeIn')
        })
        $transitions.onExit({}, function () {
            $('body').removeClass('animated fadeIn')
        })
    
        new WOW().init()
    
        $rootScope.$state = $state
    })
})()