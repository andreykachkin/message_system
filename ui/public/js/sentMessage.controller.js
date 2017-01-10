angular
    .module('app')
    .controller('SentMessageController', SentMessageController);

SentMessageController.$inject = ['$scope', 'MessageFactory'];

function SentMessageController($scope, MessageFactory) {

    MessageFactory.query({folder: 'sent'}, function(messages){
        $scope.sortDate = '-date';
        $scope.MessagesLength = messages.length;
        $scope.messages = messages;
    });
}