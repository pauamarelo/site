(function() {
    'use strict'

    const app = angular.module('myApp')

    const json = 'json/'
    // const base = 'controller/'
    const base = 'http://pauamarelo.000webhostapp.com/controller/'

    app.constant('config', {
        // noticiasConst: base+'class.conteudos.php',
        listarNoticiasConst: base+'listar.php',
        galeriaConst: json+'galeria.json',
        playersConst: json+'players.json',
        kickedConst: json+'kicked.json',
        requisitosConst: json+'requisitos.json',
        patentesConst: json+'patentes.json',
        mapaConst: json+'mapa.json'
    })
})()