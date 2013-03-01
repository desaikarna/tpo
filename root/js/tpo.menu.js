angular.module('tpo', ['ui']);

function MenuCtrl($scope, $http) {

	$scope.pages = [];

	$scope.$root.content = {url: 'content/home.html'};

	$scope.templates = [
		{ url: 'partials/menu/closed.html'},
		{ url: 'partials/menu/open2.html'}
	];

	$scope.template = $scope.templates[0];

	$scope.open = function() {
		var config = {
			method:'GET',
			url:'/request',
			headers:{resource:'/page'}
		};
		$http(config).
			success(function(data, status, headers, config) {
				$scope.pages = data;
			}).
			error(function(data, status, headers, config) {
			});
		$scope.template = $scope.templates[1];
	}

	$scope.close = function() {
		$scope.template = $scope.templates[0];
	};

	$scope.menu = function(page) {
		$scope.$root.content = {url:'content/' + page.uri};
	};

	$scope.$root.loadMenu = function() {
		var config = {
			method:'GET',
			url:'/request',
			headers:{resource:'/page'}
		};
		$http(config).
			success(function(data, status, headers, config) {
				$scope.pages = data;
			}).
			error(function(data, status, headers, config) {
			});
	};
}
