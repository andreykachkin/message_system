angular
    .module('app', ['ngResource'])
    .controller('AuthenticationController', AuthenticationController);

AuthenticationController.$inject = ['$scope','FirstLevelFactory', '$window'];

function AuthenticationController($scope, FirstLevelFactory, $window) {
    $scope.checkAuth = function () {
        var data = {
            username : this.username,
            password : this.password
        };

        FirstLevelFactory.save({url: 'authentication'}, data, function() {
            $window.location.href = '/mail';
        }, function(){
            $scope.error = true;
        });

    }
}