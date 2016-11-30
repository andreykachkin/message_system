angular
    .module('app')
    .controller('HistoryController', HistoryController);

HistoryController.$inject = ['$scope','$http', '$routeParams', '$location'];

function HistoryController($scope, $http, $routeParams, $location) {

    var history = '/history/' + $routeParams.history;

    $http.get(history).success(function(data) {
        $scope.sortDate = '-date';
        $scope.history = data;
    });
}