angular
    .module('app')
    .controller('MessageController', MessageController);

MessageController.$inject = ['$scope', '$routeParams', '$route', 'SecondLevelFactory', 'FirstLevelFactory'];

function MessageController($scope, $routeParams, $route, SecondLevelFactory, FirstLevelFactory) {
    $scope._id = $routeParams._id;

    var sessionUser;

    SecondLevelFactory.query({firstUrl: 'message', secondUrl: $routeParams._id}, function(data) {
        $scope.message = data[0];
        sessionUser = data[1];
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
        FirstLevelFactory.save({url: 'sendMessage'}, data, function() {
            $route.reload();
        });
    };
}

