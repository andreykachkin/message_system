angular
    .module('app')
    .controller('UnreadMessageController', UnreadMessageController);

UnreadMessageController.$inject = ['$scope','$http', '$route', '$location'];

function UnreadMessageController($scope, $http, $route, $location) {
    $http.get('/unreadMessage').success(function (data) {
        $scope.sortDate = '-date';
        $scope.length = data.length;

        if (data.length == 0 ) {
            var p = angular.element(document.getElementById('noMessages'));
            p.text('Нет новых сообщений');
        } else {
            $scope.messages = data;
        }
    });

    $scope.readMessage = function () {
        var data = {
            _id: this.message._id
        };
        $http.post('/readMessage', data).success(function () {
            $location.path('/messages/' + data._id);
            $route.reload();
        })
    }
}