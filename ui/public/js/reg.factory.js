angular
    .module('app')
    .factory('RegistrationFactory', RegistrationFactory);

RegistrationFactory.$inject = ['$resource'];

function RegistrationFactory($resource) {

    return $resource('/registration');

}
