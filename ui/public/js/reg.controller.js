angular
    .module('app')
    .controller('RegistrationController', RegistrationController);

RegistrationController.$inject = ['$scope','RegistrationFactory', '$window'];

function RegistrationController($scope, RegistrationFactory, $window) {

    $scope.reg = function () {
        var data = {
            username : this.username,
            password : this.password
        };
        RegistrationFactory.save({}, data, function() {
            $window.location.href = '/mail';
        }, function(){
            $scope.error = true;
        });


    }
}