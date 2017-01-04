angular
    .module('app')
    .controller('UnreadMessageController', UnreadMessageController);

UnreadMessageController.$inject = ['$scope', 'MessageFactory'];

function UnreadMessageController($scope, MessageFactory) {

    MessageFactory.query({folder: 'unread'}, function(messages) {
        $scope.sortDate = '-date';
        $scope.MessagesLength = messages.length;
        $scope.messages = messages;
    });
}