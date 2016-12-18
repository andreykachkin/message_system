angular
    .module('app')
    .controller('TotalController', TotalController);

TotalController.$inject = ['$scope', '$route', '$location', 'FirstLevelFactory'];

function TotalController($scope, $route, $location, FirstLevelFactory) {

    FirstLevelFactory.query({url: 'users'}, function(data){
        $scope.sortParam = 'username';
        $scope.users = data;
    });

    FirstLevelFactory.query({url: 'inboxMessage'}, function (data) {
        $scope.sortDate = '-date';
        $scope.messages = data;
    });

    $scope.sendMessage = function (){
        var data = {
            addressee : this.user.username,
            text : this.text
        };

        FirstLevelFactory.save({url: 'sendMessage'}, data, function() {
            var modal = angular.element(document.querySelector('.modal.fade.in'));
            modal.modal('hide');
            $route.reload();
        });
    };

    $scope.readMessage = function(){
        var data = {
            _id : this.message._id
        };

        FirstLevelFactory.save({url: 'readMessage'}, data, function() {
            $location.path('/messages/' + data._id);
            $route.reload();
        });
    };
}

