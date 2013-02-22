angular.module('tpo', ['ui']);

function HeaderLoginCtrl($scope, $http) {
    
    function resetAccount(){
        $scope.account = {
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
                console.log(data);
                if(data.value) {
                    $scope.account.username.style = '';
                } else {
                    $scope.account.username.style = 'invalid';
                }
                calback(data.value);
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
        if ($scope.account.passwordnew.valid && $scope.account.confirm.valid && $scope.account.pin.valid && $scope.account.email.valid) {
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
        }
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
    $scope.passwordConfirmValidation = function(value) {
        if(value !== '' && value !== $scope.account.passwordnew.value){
            $scope.account.confirm.style = 'invalid';
            $scope.account.confirm.valid = false;
        } else {
            $scope.account.confirm.style = '';
            $scope.account.confirm.valid = true;
        }
    };
    $scope.pinValidation = function(value) {
        if(value !== '' && !($scope.account.pin.regex.test(value))){
            $scope.account.pin.style = 'invalid';
            $scope.account.pin.valid = false;
        } else {
            $scope.account.pin.style = '';
            $scope.account.pin.valid = true;
        }
    };
    $scope.emailValidation = function(value) {
        if(value !== '' && !($scope.account.email.regex.test(value))){
            $scope.account.email.style = 'invalid';
            $scope.account.email.valid = false;
        } else {
            $scope.account.email.style = '';
            $scope.account.email.valid = true;
        }
    };
    $scope.passwordNewValidation = function(value) {
        console.log($scope.account.displayname.value);
        if(value !== '' && (!($scope.account.passwordnew.regex.first.test(value)) || !($scope.account.passwordnew.regex.second.test(value)))){
            $scope.account.passwordnew.style = 'invalid';
             $scope.account.passwordnew.valid = false;
        } else {
            $scope.account.passwordnew.style = '';
            $scope.account.passwordnew.valid = true;
        }
    };
}
