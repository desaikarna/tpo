angular.module('tpo', ['ui']);

function HeaderLoginCtrl($scope, $http) {
    
    function resetAccount(){
        $scope.account = {
			id:{
				value:''
			},
            username:{
                value:'',
                tooltip:'Enter your desired username',
                valid:false,
                style:'',
                minLength:6
            },
            password:{
                value:'',
                tooltip:'password',
                valid:false,
                style:''
            },
            passwordnew:{
                value:'',
                tooltip:'Your Password must:\ncontain at least one digit [0-9]\ncontain at least one lowercase alpha character [a-z]\ncontain at least one uppercase alpha character [A-Z]\ncontain at least one special character in the set {!,@,#,$,%,&,*,(,)}\nbe between 8 and 24 characters long',
                valid:false,
                style:'',
                regex: {
                    first:/^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,24})$/,
                    second:/^[\dA-z!#$]*$/
                }
            },
            confirm:{
                value:'',
                tooltip:'Confirm your password',
                valid:false,
                style:''
            },
            pin:{
                value:'',
                tooltip:'Enter your pin',
                valid:false,
                style:'',
                regex:/^\d{4}$/
            },
            email:{
                value:'',
                tooltip:'Enter your email address',
                valid:false,
                style:'',
                regex:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            },
            firstname:{
                value:'',
                tooltip:'Enter your first name',
                valid:false,
                style:''
            },
            lastname:{
                value:'',
                tooltip:'Enter your last name',
                valid:false,
                style:''
            },
            displayname:{
                value:'',
                tooltip:'Enter how you want you name displayed',
                valid:false,
                style:''
            }
        };    
    }
    function validateUsername(calback){
        if ($scope.account.username.value.length < $scope.account.username.minLength) {
            calback(false);
        }
        var config = {
            method:'POST',
            url:'/request',
            headers:{resource:'/validate/login/' + $scope.account.username.value},
        };
        $http(config).
            success(function(data, status, headers, config) {
                if(data.validated) {
                    $scope.account.username.style = '';
                } else {
                    $scope.account.username.style = 'invalid';
                }
                calback(data.validated);
            }).
            error(function(data, status, headers, config) {
                calback(false);
        }); 
    }
    
    $scope.templates = [
        { url: 'partials/header/authenticated.html'},
        { url: 'partials/header/login.html'},
        { url: 'partials/header/profile.html'},
        { url: 'partials/header/register.html'},
        { url: 'partials/header/unauthenticated.html'},
        { url: 'partials/header/processing.html'},
		{ url: 'partials/header/error.html'}
    ];
    
    resetAccount();
    
    $scope.template = $scope.templates[4];
    
    $scope.login = function(){
        $scope.template = $scope.templates[1];
    };
    $scope.register = function(){
        $scope.template = $scope.templates[3];
    };
    $scope.signin = function(){
		$scope.template = $scope.templates[5];
		var config = {
			method:'POST',
			url:'/request',
			data:{
				password : $scope.account.password.value
			},
			headers:{resource:'/account/' + $scope.account.username.value}
		};
		$http(config).
			success(function(data, status, headers, config) {
				$scope.loadMenu();
				$scope.account.password.value = '';
				$scope.account.id.value = data.id;
				$scope.template = $scope.templates[0];
			}).
			error(function(data, status, headers, config) {
				console.log('signin error');
				$scope.account.username.value = '';
				$scope.account.password.value = '';
				$scope.template = $scope.templates[6];
			});
    };
    $scope.cancel = function(index){
        $scope.template = $scope.templates[index];
    };
    $scope.create = function(){
		$scope.template = $scope.templates[5];
		var config = {
			method:'POST',
			url:'/request',
			params:{},
			data:{
				email : $scope.account.email.value,
				login : $scope.account.username.value,
				displayName : $scope.account.displayname.value,
				firstName : $scope.account.firstname.value,
				lastName : $scope.account.lastname.value,
				password : $scope.account.passwordnew.value,
				pin : $scope.account.pin.value
			},
			headers:{resource:'/account'}
		};
		$http(config).
			success(function(data, status, headers, config) {
				$scope.loadMenu();
				$scope.account.passwordnew.value = '';
				$scope.account.confirm.value = '';
				$scope.account.id.value = data.id;
				$scope.template = $scope.templates[0];
			}).
			error(function(data, status, headers, config) {
				console.log('create error');
				$scope.template = $scope.templates[4];
		});
    };
    $scope.profile = function(){
		$scope.template = $scope.templates[5];
		var config = {
			method:'GET',
			url:'/request',
			headers:{resource:'/account/' + $scope.account.id.value}
		};
		$http(config).
			success(function(data, status, headers, config) {
				$scope.account.username.value = data.login;
				$scope.account.displayname.value = data.displayName;
				$scope.account.email.value = data.email;
				$scope.account.firstname.value = data.firstName;
				$scope.account.lastname.value = data.lastName;
				$scope.account.pin.value = data.pin;
				$scope.account.id.value = data.id;
				$scope.template = $scope.templates[2];
			}).
			error(function(data, status, headers, config) {
				console.log('profile error');
			});

    };
    $scope.logout = function(){
        var config = {
			method:'DELETE',
			url:'/request',
			headers:{resource:'/account'}
		};
		$http(config).
			success(function(data, status, headers, config) {
				resetAccount();
				$scope.template = $scope.templates[4];
			}).
			error(function(data, status, headers, config) {
				console.log('logout error');
				$scope.template = $scope.templates[4];
			});
    };
	$scope.delete = function(){
		var config = {
			method:'DELETE',
			url:'/request',
			headers:{resource:'/account/' + $scope.account.id.value}
		};
		$http(config).
			success(function(data, status, headers, config) {
				resetAccount();
				$scope.template = $scope.templates[4];
			}).
			error(function(data, status, headers, config) {
				console.log('delete error');
				$scope.template = $scope.templates[4];
			});
	};
    $scope.update = function(){
		$scope.template = $scope.templates[5];
		var config = {
			method:'PUT',
			url:'/request',
			params:{},
			data:{
				email : $scope.account.email.value,
				login : $scope.account.username.value,
				displayName : $scope.account.displayname.value,
				firstName : $scope.account.firstname.value,
				lastName : $scope.account.lastname.value,
				password : $scope.account.passwordnew.value,
				pin : $scope.account.pin.value
			},
			headers:{resource:'/account/' + $scope.account.id.value}
		};
		$http(config).
			success(function(data, status, headers, config) {
				$scope.account.passwordnew.value = '';
				$scope.account.confirm.value = '';
				$scope.template = $scope.templates[2];
			}).
			error(function(data, status, headers, config) {
				console.log('update error');
			});
    };
}
