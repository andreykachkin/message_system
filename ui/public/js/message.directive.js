angular
    .module('app')
    .directive('messagesList', messagesList);

messagesList.$inject = [];

function messagesList() {

    return {
        replace: true,
        templateUrl: 'template/messages_list.ejs',
        link: function (scope, elem, attr) {
            var i = elem.find('i');
            var td = elem.find('td.secondUser');

            switch (attr.messagesList) {

                case 'inbox':
                    if (scope.message.status == 'unread') {
                        i.addClass('fa-envelope');
                    } else {
                        i.addClass('fa-envelope-open-o');
                    }
                    td.text(scope.message.sender);
                    break;

                case 'sent':
                    i.addClass('fa-envelope-o');
                    td.text(scope.message.addressee);
                    break;

                case 'unread':
                    i.addClass('fa-envelope');
                    td.text(scope.message.sender);
                    break;
            }
        }
    }

}
