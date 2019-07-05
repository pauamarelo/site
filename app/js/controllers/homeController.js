(function() {
    'use strict'

    const app = angular.module('myApp')

    app.controller("homeCtrl", function($scope, $http, config, toaster) {
        const vm = this

        vm.hoje = new Date().getFullYear()

        //array players
        function listarIntegrantes() {
            $http.get(config.integrantes)
            .then((response) => {
                vm.players = response.data.data
            })
        }
        listarIntegrantes()
        //array ex-integrantes
        $http.get(config.kickedConst)
        .then(function(response) {
            vm.exIntegrantes = response.data.lista
        })
        //array requisitos peneira
        $http.get(config.requisitosConst)
        .then(function(response) {
            vm.requisitos = response.data.lista
        })
        //array patentes
        $http.get(config.patentesConst)
        .then(function(response) {
            vm.patentes = response.data.lista
        })

        vm.dados = {}
        vm.mapa = []
        vm.carousel = false

        function listar() {        
            //carousel
            $http.get(config.mapaConst)
            .then(function(response) {
                vm.mapa = response.data.lista
                vm.carousel = true
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


        // Enviar inscrição
        vm.isLoading = false
        vm.enviar = function(d) {
            vm.isLoading = true
            let objData = {
                nome: d.nome,
                idade: d.idade,
                email: d.email,
                patente: d.patente,
                mensagem: d.mensagem
            }
            $http.post(config.inscricao, objData)
            .then((response) => {
                if(response.data.status) {
                    toaster.success('Sucesso!', response.data.msg)
                    vm.peneira = {}
                    vm.isLoading = false
                } else {
                    toaster.error('Erro', response.data.msg)
                    vm.isLoading = false
                }
            })
            .catch((error) => {
                toaster.error('Erro', error.data)
                vm.isLoading = false
            })
        }
    })
})()