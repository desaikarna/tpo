angular.module('tpo', ['ui']);

function HeaderLoginCtrl($scope, $http) {
    
    function resetAccount(){
        $scope.account = {
            username:{
                value:'',
                minLength:6,
                tooltip:'uSeRnAmE'
            },
            password:{
                value:''
            },
            passwordnew:{
                value:''
            },
            confirm:{
                value:'',
                style:''
            },
            pin:{
                value:''
            },
            email:{
                value:''
            },
            firstname:{
                value:''
            },
            lastname:{
                value:''
            },
            displayname:{
                value:''
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
                console.log(data);
                console.log(data.value);
                calback(false);
            }).
            error(function(data, status, headers, config) {
                console.log(data);
                calback(false);
        }); 
    }
    
    function sleep(ms)
    {
		var dt = new Date();
		dt.setTime(dt.getTime() + ms);
		while (new Date().getTime() < dt.getTime());
	}
    
    $scope.templates = [
        { url: 'partials/header/authenticated.html'},
        { url: 'partials/header/login.html'},
        { url: 'partials/header/profile.html'},
        { url: 'partials/header/register.html'},
        { url: 'partials/header/unauthenticated.html'},
        { url: 'partials/header/processing.html'}
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
        if($scope.account.username !== '' && $scope.account.password !== ''){
            $scope.template = $scope.templates[0];
        } else {
            
        }
    };
    $scope.cancel = function(index){
        $scope.template = $scope.templates[index];
    };
    $scope.create = function(){
        validateUsername(function(isValid){
            if(isValid){
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
                        password : $scope.account.password.value,
                        pin : $scope.account.pin.value
                    },
                    headers:{resource:'/account'},
                };
                $http(config).
                    success(function(data, status, headers, config) {
                        console.log('data');
                        console.log(data);
                        console.log('status');
                        console.log(status);
                        console.log('headers');
                        console.log(headers);
                        console.log('config');
                        console.log(config);
                        alert('ok');
                        $scope.template = $scope.templates[0];
                    }).
                    error(function(data, status, headers, config) {
                        console.log('data');
                        console.log(data);
                        console.log('status');
                        console.log(status);
                        console.log('headers');
                        console.log(headers);
                        console.log('config');
                        console.log(config);
                        alert('no');
                }); 
            } else {
                $scope.template = $scope.templates[3];    
            }
        });
        $scope.template = $scope.templates[5];
    };
    $scope.profile = function(){
        $scope.template = $scope.templates[2];
    };
    $scope.logout = function(){
        resetAccount();
        $scope.template = $scope.templates[4];
    };
    $scope.update = function(){
        $scope.template = $scope.templates[0];
    };

//    Validation Functions
    $scope.passwordConfirm = function(value) {
        if(value !== '' && value !== $scope.account.password.value){
            $scope.account.confirm.style = 'invalid';
        } else {
            $scope.account.confirm.style = '';
        }
    };
}
