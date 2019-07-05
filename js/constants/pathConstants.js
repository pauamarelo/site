(function() {
    'use strict'

    const app = angular.module('myApp')

    const json = 'json/'
    const base = 'https://pauamarelo.herokuapp.com/oapi/'

    app.constant('config', {
        noticias: base+'news',
        galeriaConst: json+'galeria.json',
        playersConst: json+'players.json',
        kickedConst: json+'kicked.json',
        requisitosConst: json+'requisitos.json',
        patentesConst: json+'patentes.json',
        mapaConst: json+'mapa.json',
        integrantes: base+'integrantes',
        galeria: base+'galeria',
        inscricao: base+'send-mail'
    })
})()