angular
    .module('app')
    .factory('UserFactory', UserFactory);

UserFactory.$inject = ['$resource'];

function UserFactory($resource) {

    return $resource('/users', {});

}
