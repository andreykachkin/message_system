angular
    .module('app')
    .factory('MessageFactory', MessageFactory);

MessageFactory.$inject = ['$resource'];

function MessageFactory($resource) {

    return $resource('/messages/:message_id');

}
