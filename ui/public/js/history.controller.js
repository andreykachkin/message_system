angular
    .module('app')
    .controller('HistoryController', HistoryController);

HistoryController.$inject = ['$scope', '$routeParams', 'MessageFactory'];

function HistoryController($scope, $routeParams, MessageFactory) {

    MessageFactory.query({folder: 'history', users: $routeParams.users}, function(history) {
        $scope.sortDate = '-date';
        $scope.history = history;
    })
}