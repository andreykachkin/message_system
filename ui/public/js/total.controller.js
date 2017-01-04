angular
    .module('app')
    .controller('TotalController', TotalController);

TotalController.$inject = ['$scope', '$route', 'UserFactory', 'MessageFactory'];

function TotalController($scope, $route, UserFactory, MessageFactory) {

    UserFactory.query(function (users) {
        $scope.users = users;
        $scope.sortParam = 'username';
    });

    MessageFactory.query({folder: 'inbox'}, function (messages) {
        $scope.sortDate = '-date';
        $scope.messages = messages;
    });

    $scope.sendMessage = function (){
        var data = {
            addressee : this.user.username,
            text : this.text
        };

        MessageFactory.save({}, data, function() {
            var modal = angular.element(document.querySelector('.modal.fade.in'));
            modal.modal('hide');
            $route.reload();
        });
    };
}

