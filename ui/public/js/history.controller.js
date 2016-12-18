angular
    .module('app')
    .controller('HistoryController', HistoryController);

HistoryController.$inject = ['$scope', '$routeParams', 'SecondLevelFactory'];

function HistoryController($scope, $routeParams, SecondLevelFactory) {

    SecondLevelFactory.query({firstUrl: 'history', secondUrl: $routeParams.history}, function(data) {
        $scope.sortDate = '-date';
        $scope.history = data;
    })
}