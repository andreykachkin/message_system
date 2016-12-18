angular
    .module('app')
    .controller('SentMessageController', SentMessageController);

SentMessageController.$inject = ['$scope', 'FirstLevelFactory'];

function SentMessageController($scope, FirstLevelFactory) {

    FirstLevelFactory.query({url: 'sentMessage'}, function(data){
        $scope.sortDate = '-date';
        $scope.messages = data;
    });
}