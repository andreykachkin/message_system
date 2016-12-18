angular
    .module('app', ['ngResource'])
    .controller('RegistrationController', RegistrationController);

RegistrationController.$inject = ['$scope','FirstLevelFactory', '$window'];

function RegistrationController($scope, FirstLevelFactory, $window) {

    $scope.reg = function () {
        var data = {
            username : this.username,
            password : this.password
        };
        FirstLevelFactory.save({url: 'registration'}, data, function() {
            $window.location.href = '/mail';
        }, function(){
            $scope.error = true;
        });


    }
}