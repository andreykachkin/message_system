angular
    .module('app')
    .config(config);

config.$inject = ['$routeProvider', '$locationProvider'];

function config($routeProvider, $locationProvider) {
    $routeProvider
        .when('/mail', {
            templateUrl: '/messages/inbox',
            controller : 'TotalController'
        })
        .when('/messages/inbox', {
            templateUrl: '/messages/inbox',
            controller: 'TotalController'
        })
        .when('/messages/sent', {
            templateUrl: '/messages/sent',
            controller: 'SentMessageController'
        })
        .when('/messages/unread', {
            templateUrl: '/messages/unread',
            controller: 'UnreadMessageController'
        })
        .when('/messages/new', {
            templateUrl: '/messages/new',
            controller: 'NewMessageController'
        })
        .when('/messages/:_id', {
            templateUrl: '/messages/message_info',
            controller: 'MessageController'
        })
        .when('/messages/history/:history', {
            templateUrl: '/messages/history',
            controller: 'HistoryController'
        })
        .otherwise({
            //redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
}