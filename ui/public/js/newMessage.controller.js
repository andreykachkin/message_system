angular
    .module('app')
    .controller('NewMessageController', NewMessageController);

NewMessageController.$inject = ['$scope', 'FirstLevelFactory', '$route'];

function NewMessageController($scope, FirstLevelFactory, $route) {

    FirstLevelFactory.query({url: 'users'}, function(data){
        $scope.sortParam = 'username';
        $scope.users = data;
    });

    $scope.sendNewMessage = function(){
        var data = {
            addressee : this.addressee,
            text: this.text
        };
        FirstLevelFactory.save({url: 'sendMessage'}, data, function() {
            $route.reload();
        })
    };
}