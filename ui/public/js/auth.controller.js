angular
    .module('app')
    .controller('AuthenticationController', AuthenticationController);

AuthenticationController.$inject = ['$scope','AuthenticationFactory', '$window'];

function AuthenticationController($scope, AuthenticationFactory, $window) {
    $scope.checkAuth = function () {
        var data = {
            username : this.username,
            password : this.password
        };

        AuthenticationFactory.save({}, data, function() {
            $window.location.href = '/mail';
        }, function(){
            $scope.error = true;
        });

    }
}