(function() {
    'use strict'

    const app = angular.module('myApp')

    app.controller("noticiaCtrl", function($scope, $http, $stateParams, $location) {
        const vm = this

        const base = 'http://pauamarelo.000webhostapp.com/@/'
    
        vm.dados = {}
        vm.retorno = {}
        const url = $stateParams.url
        
        function listar() {
            $http.get(base+'controller/listar.php')
            .then(function(response) {
                vm.noticias = response.data
        
                vm.noticia = vm.noticias.filter(function(user) {
                    return user.urlNoticia === url
                })[0]
    
                // Disqus
                // var disqus_config = function () {
                //     this.page.url = vm.noticia.url  // Replace PAGE_URL with your page's canonical URL variable
                //     this.page.identifier = vm.noticia.idNoticia // Replace PAGE_IDENTIFIER with your page's unique identifier variable
                // }
                // (function() { // DON'T EDIT BELOW THIS LINE
                //     var d = document, s = d.createElement('script')
                //     s.src = 'https://pauamarelo-1.disqus.com/embed.js'
                //     s.setAttribute('data-timestamp', +new Date())
                //     (d.head || d.body).appendChild(s)
                // })()

                vm.disqusConfig = {
                    disqus_shortname: 'pauamarelo-1',
                    disqus_identifier: vm.noticia.idNoticia,
                    // disqus_url: 'http://localhost/pauamarelo/public/noticia/'+vm.noticia.url
                    disqus_url: $location.absUrl()
                }

                // console.log(window.location.href)
            })
        }
        listar()
    })
})()