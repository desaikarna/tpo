angular.module('tpo', ['ui']);

function MenuCtrl($scope) {

	$scope.pages = [
		{
			title: 'Home',
			uri: 'home.html',
			subpages: [
				{
					title: 'Contact',
					uri:'contact.html',
					subpages:[
					]
				}
			]
		},
		{
			title: 'About',
			uri: 'about.html',
			subpages: [
			]
		}
	];

	$scope.templates = [
		{ url: 'partials/menu/closed.html'},
		{ url: 'partials/menu/open.html'}
	];

	$scope.template = $scope.templates[0];

	$scope.open = function() {
		$scope.template = $scope.templates[1];
	}

	$scope.close = function() {
		$scope.template = $scope.templates[0];
	}

	$scope.menu = function(uri) {
		console.log(uri);
	}



}
