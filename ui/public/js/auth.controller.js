angular
    .module('app', [])
    .controller('AuthenticationController', AuthenticationController);

AuthenticationController.$inject = ['$scope','$http', '$window'];

function AuthenticationController($scope, $http, $window) {

    $scope.checkAuth = function () {
        var data = {
            username : this.username,
            password : this.password
        };
        $http.post('/authentication', data).success(function() {
            $window.location.href = '/mail';
        }).error(function() {
            var bodyError = angular.element(document.querySelector('#error'));
            var error = angular.element('<p class="text-danger">Неправильный логин или пароль</p>');
            if (bodyError.find('p')) {
                bodyError.find('p').remove();
                bodyError.append(error);
            } else {
                bodyError.append(error);
            }
        })

    }
}