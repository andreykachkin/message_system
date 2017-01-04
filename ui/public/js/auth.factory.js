angular
    .module('app')
    .factory('AuthenticationFactory', AuthenticationFactory);

AuthenticationFactory.$inject = ['$resource'];

function AuthenticationFactory($resource) {

    return $resource('/authentication');

}
