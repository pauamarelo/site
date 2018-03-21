angular.module("myApp", ["ngSanitize"])
	.controller("myCtrl", function ($scope) {
		$scope.noticias = [
			{
				foto: "images/logo2.png",
				link: "",
				titulo: "Novo site do PAU AMARELO",
				texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quis neque nec nisl semper rutrum vitae fermentum enim. Fusce interdum a lacus non aliquet. Ut non ultricies justo, in ultricies lorem. In in metus vel velit placerat convallis",
				data: "01/03/2018"
			},
			{
				foto: "images/ranks/17.png",
				link: "",
				titulo: "Novo sistema de patentes",
				texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quis neque nec nisl semper rutrum vitae fermentum enim. Fusce interdum a lacus non aliquet. Ut non ultricies justo, in ultricies lorem. In in metus vel velit placerat convallis",
				data: "01/03/2018"
			}
		];
	})

//############## FILTERS ##############//
	.filter('limite', function() {
    return function (input) {
        if (input.length <= 26) return input;
        var output = input.substring(0,26) + "...";
        return output;
    };
});