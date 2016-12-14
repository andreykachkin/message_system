angular
    .module('app', [])
    .controller('RegistrationController', RegistrationController);

RegistrationController.$inject = ['$scope','$http', '$window'];

function RegistrationController($scope, $http, $window) {

    $scope.reg = function () {
        var data = {
            username : this.username,
            password : this.password
        };
        $http.post('/registration', data).success(function() {
            $window.location.href = '/mail';
        }).error(function() {
            var bodyError = angular.element(document.querySelector('#error'));
            var error = angular.element('<p class="text-danger">Пользователь с таким именем уже существует.</p>');
            if (bodyError.find('p')) {
                bodyError.find('p').remove();
                bodyError.append(error);
            } else {
                bodyError.append(error);
            }
        })

    }
}