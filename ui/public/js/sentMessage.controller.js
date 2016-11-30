angular
    .module('app')
    .controller('SentMessageController', SentMessageController);

SentMessageController.$inject = ['$scope','$http', '$route'];

function SentMessageController($scope, $http) {
    $http.get('/sentMessage').success(function (data) {
        $scope.sortDate = '-date';
        $scope.messages = data;

    })
}