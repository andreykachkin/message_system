angular
    .module('app')
    .controller('NewMessageController', NewMessageController);

NewMessageController.$inject = ['$scope', '$http', '$route'];

function NewMessageController($scope, $http, $route) {
    $http.get('/users').success(function(data){
        $scope.sortParam = 'username';
        $scope.users = data;
    }).error(function(){

    });

    $scope.sendNewMessage = function(){
        var data = {
            addressee : this.addressee,
            text: this.text
        };
        $http.post('/sendMessage', data).success(function() {
            $route.reload();
        }).error(function() {

        })
    };
}