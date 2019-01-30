(function() {
    'use strict'

    const app = angular.module('myApp')

    app.controller("homeCtrl", function($scope, $http) {
        const vm = this

        vm.hoje = new Date().getFullYear()

        //array players
        $http.get('json/players.json')
        .then(function(response) {
            vm.players = response.data.lista
        })
        //array ex-integrantes
        $http.get('json/kicked.json')
        .then(function(response) {
            vm.exIntegrantes = response.data.lista
        })
        //array requisitos peneira
        $http.get('json/requisitos.json')
        .then(function(response) {
            vm.requisitos = response.data.lista
        })
        //array requisitos peneira
        $http.get('json/patentes.json')
        .then(function(response) {
            vm.patentes = response.data.lista
        })

        vm.dados = {}
        vm.mapa = []
        vm.carousel = false

        function listar() {        
            //carousel
            $http.get('json/mapa.json')
            .then(function(response) {
                vm.mapa = response.data.lista
                vm.carousel = true
                console.log('carousel: ', vm.mapa)
            })
        }
        listar()

        vm.pegaDados = function(user) {
            vm.dados = user
        }

        //tabs
        vm.tab = 1
        vm.setTab = function (tabId) {
            vm.tab = tabId
        }
        vm.isSet = function (tabId) {
            return vm.tab === tabId
        }
    })
})()