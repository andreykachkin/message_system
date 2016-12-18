angular
    .module('app')
    .factory('FirstLevelFactory', FirstLevelFactory);

FirstLevelFactory.$inject = ['$resource'];

function FirstLevelFactory($resource) {

    return $resource('/:url', {});

}
