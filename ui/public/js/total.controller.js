angular
    .module('app')
    .controller('TotalController', TotalController);

TotalController.$inject = ['$scope', '$http', '$route', '$location'];

function TotalController($scope, $http, $route, $location) {
    $http.get('/users').success(function(data){
        $scope.sortParam = 'username';
        $scope.users = data;
    }).error(function(){

    });

    $http.get('/inboxMessage').success(function(data){
        $scope.sortDate = '-date';
        $scope.messages = data;
    });

    $scope.sendMessage = function (){
        var data = {
            addressee : this.user.username,
            text : this.text
        };
        $http.post('/sendMessage', data).success(function() {
            var modal = angular.element(document.querySelector('.modal.fade.in'));
            modal.modal('hide');
            $route.reload();
        }).error(function() {

        })
    };

    $scope.readMessage = function(){
        var data = {
            _id : this.message._id
        };
        $http.post('/readMessage', data).success(function() {
            $location.path('/messages/' + data._id);
            $route.reload();
        }).error(function() {

        })
    };

}

