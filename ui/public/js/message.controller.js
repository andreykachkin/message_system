angular
    .module('app')
    .controller('MessageController', MessageController);

MessageController.$inject = ['$scope','$http', '$routeParams', '$route'];

function MessageController($scope, $http, $routeParams, $route) {
    $scope._id = $routeParams._id;

    var sessionUser;
    var message = '/message/' + $routeParams._id;

    $http.get(message).success(function(data) {
        $scope.message = data[0];
        sessionUser = data[1];
    });

    $scope.sendMessage = function(){
        console.log(sessionUser);
        var data = {
            text: this.text
        };
        if (this.message.sender == sessionUser) {
            data.addressee = this.message.addressee
        } else {
            data.addressee = this.message.sender
        }
        $http.post('/sendMessage', data).success(function() {
            $route.reload();
        }).error(function() {

        })
    };
}

