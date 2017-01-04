angular
    .module('app')
    .controller('NewMessageController', NewMessageController);

NewMessageController.$inject = ['$scope', '$route', 'UserFactory', 'MessageFactory'];

function NewMessageController($scope, $route, UserFactory, MessageFactory) {

    UserFactory.query({}, function(users){
        $scope.sortParam = 'username';
        $scope.users = users;
    });

    $scope.sendMessage = function(){
        var data = {
            addressee : this.addressee,
            text: this.text
        };
        MessageFactory.save({}, data, function() {
            $route.reload();
        })
    };
}