(function() {
    'use strict'

    const app = angular.module('myApp')

    app.directive('fbComments', ['$timeout',function($timeout) {
	    return {
			restrict: 'AE',
			scope: {
			href: '@href',
			numpost : '@numpost',
			colorscheme: '@colorscheme',
			mobile: '@mobile',
			width: '@width'
			},
			template: '<div class="fb-comments" '+
			              'data-href="{{href}}" '+
			              'data-numposts="{{numpost}}" '+
			              'data-colorscheme="{{colorscheme}}" '+
			              'data-mobile="{{mobile}}" '+
			              'data-width="{{width}}"> '+
			        '</div>',
			link: function($scope,element,attr){ 	
				window.fbAsyncInit = function() {
				    FB.init({
 				      appId            : '1322914631181549',// here you can insert your FB Comments App ID
				      autoLogAppEvents : true,
				      xfbml            : true,
				      version          : 'v3.2'
				    });
				};

				(function(d, s, id){
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) {return;}
                    js = d.createElement(s); js.id = id;
                    js.src = "https://connect.facebook.net/pt_BR/sdk.js";
                    fjs.parentNode.insertBefore(js, fjs);
				}(document, 'script', 'facebook-jssdk'));
                
                
				function setComment() {
			        if (typeof FB != 'undefined' && FB !== null){
	                    FB.XFBML.parse(element[0]);
                    }
			    }

				$timeout(function(){ 
				    return setComment();
				});
 
 			}

	    };
	}]);
})()