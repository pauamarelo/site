(function() {
    'use strict'

    const app = angular.module('myApp')

    app.controller("noticiasCtrl", function($scope, $http, config) {
        const vm = this

        $(document).ready(function(){
            setTimeout(() => {
                $('.sidenav').sidenav()
                $('.parallax').parallax()
                $('select').formSelect()
                $('.datepicker').datepicker({
                    showClearBtn: true,
                    setDefaultDate: true,
                    format: 'yyyy-mm-dd',
                    i18n: {
                        clear: 'Limpar',
                        cancel: 'Fechar',
                        months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                        monthsShort: ['Jan', 'Fev', 'Mar', 'Abrl', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                        weekdays: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
                        weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
                        weekdaysAbbrev: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
                    }
                })
            }, 300)
        })
    
        vm.loading = false
        vm.dateFilter = ''
        vm.autorFilter = ''
    
        function listar() {
            vm.loading = true
            $http.get(config.noticias)
            .then(function(response) {
                vm.res = response.data
                vm.noticias = response.data.data
                vm.loading = false
            })
        }
        listar()

        vm.limiteNoticias = 10
        vm.carregar = function() {
            vm.limiteNoticias += 10
        }


        // Date picker config
        vm.month = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
        vm.monthShort = ['Jan', 'Fev', 'Mar', 'Abrl', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
        vm.weekdaysFull = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
        vm.weekdaysLetter = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
        vm.disable = [false, 1, 7]
        vm.today = 'Hoje'
        vm.clear = 'Limpar'
        vm.close = 'Ok'
    })
})()