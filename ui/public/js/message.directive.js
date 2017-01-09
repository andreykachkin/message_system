angular
    .module('app')
    .directive('messageDirective', messageDirective);

messageDirective.$inject = [];

function messageDirective() {

    return {
        replace: true,
        templateUrl: 'template/message_template.ejs'
    }

}
