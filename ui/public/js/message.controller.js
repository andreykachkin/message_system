angular
    .module('app')
    .controller('MessageController', MessageController);

MessageController.$inject = ['$scope', '$routeParams', '$route', 'MessageFactory'];

function MessageController($scope, $routeParams, $route, MessageFactory) {
    var sessionUser;

    MessageFactory.query({message_id: $routeParams._id}, function(message) {
        $scope.message = message[0];
        sessionUser = message[1];
    });

    $scope.sendMessage = function(){
        var data = {
            text: this.text
        };
        if (this.message.sender == sessionUser) {
            data.addressee = this.message.addressee
        } else {
            data.addressee = this.message.sender
        }
        MessageFactory.save({}, data, function() {
            $route.reload();
        });
    };
}

