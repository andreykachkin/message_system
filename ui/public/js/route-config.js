angular
    .module('app')
    .config(config);

config.$inject = ['$routeProvider', '$locationProvider'];

function config($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/template/authentication',
            controller: 'AuthenticationController'
        })
        .when('/registration', {
            templateUrl: '/template/registration',
            controller: 'RegistrationController'
        })
        .when('/mail', {
            templateUrl: '/template/inbox',
            controller : 'TotalController'
        })
        .when('/sent', {
            templateUrl: '/template/sent',
            controller: 'SentMessageController'
        })
        .when('/unread', {
            templateUrl: '/template/unread',
            controller: 'UnreadMessageController'
        })
        .when('/new', {
            templateUrl: '/template/new',
            controller: 'NewMessageController'
        })
        .when('/:_id', {
            templateUrl: '/template/message_info',
            controller: 'MessageController'
        })
        .when('/history/:users', {
            templateUrl: '/template/history',
            controller: 'HistoryController'
        })
        .otherwise({
            //redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
}