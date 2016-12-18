angular
    .module('app')
    .factory('SecondLevelFactory', SecondLevelFactory);

SecondLevelFactory.$inject = ['$resource'];

function SecondLevelFactory($resource) {

    return $resource('/:firstUrl/:secondUrl', {});

}
