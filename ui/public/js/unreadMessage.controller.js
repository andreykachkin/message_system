angular
    .module('app')
    .controller('UnreadMessageController', UnreadMessageController);

UnreadMessageController.$inject = ['$scope','FirstLevelFactory', '$route', '$location'];

function UnreadMessageController($scope, FirstLevelFactory, $route, $location) {

    FirstLevelFactory.query({url: 'unreadMessage'}, function(data) {
        $scope.sortDate = '-date';
        $scope.MessagesLength = data.length;
        $scope.messages = data;
    });

    $scope.readMessage = function () {
        var data = {
            _id: this.message._id
        };

        FirstLevelFactory.save({url: 'readMessage'}, data, function() {
            $location.path('/messages/' + data._id);
            $route.reload();
        });
    }
}