var bodyParser = require('body-parser');
var config = require('./configBD');
var User = require('./models/user').User;
var Message = require('./models/message').Message;
var jsonParser = bodyParser.json();

module.exports = function (app) {
    app.use(require('./loadUser'));

    app.post('/registration', jsonParser, function(req, res, next){
        var username = req.body.username.toLowerCase();
        var password = req.body.password;

        User.findOne({username: username}, function (err, user) {
            if (err) return next(err);
            if (user) {
                res.sendStatus(401);
            } else {
                var user = new User({username: username, password: password});
                user.save(function (err) {
                    if (err) return next(err);
                    req.session.user = user.username;
                    res.sendStatus(200);
                });
            }
        })
    });

    app.post('/authentication', jsonParser, function(req, res, next){
        var username = req.body.username;
        var password = req.body.password;

        User.findOne({username: username}, function (err, user) {
            if (err) return next(err);
            if (user) {
                if (user.password === password) {
                    req.session.user = user.username;
                    res.sendStatus(200);

                } else {
                    res.sendStatus(401);
                }
            } else {
                res.sendStatus(401);
            }
        })
    });

    app.post('/logout', function(req, res){
        req.session.destroy();
        res.redirect('/');
    });

    app.post('/messages', jsonParser, function(req, res, next) {
        var sender = req.session.user;
        var addresseeArr = req.body.addressee;
        var text = req.body.text;

        if (typeof(addresseeArr) == 'string') {
            var message = new Message({
                sender: sender,
                addressee: addresseeArr,
                text: text,
                date: Date.now(),
                status: 'unread'
            });
            message.save(function (err) {
                if (err) return next(err);
                res.sendStatus(200);
            })
        } else {
            for (var i = 0; i < addresseeArr.length; i++) {
                var addressee = addresseeArr[i];

                var message = new Message({
                    sender: sender,
                    addressee: addressee,
                    text: text,
                    date: Date.now(),
                    status: 'unread'
                });
                message.save(function (err) {
                    if (err) return next(err);
                })
            }
            res.sendStatus(200);
        }
    });

    app.get('/messages', function (req, res, next) {

        switch(req.query.folder) {

            case 'inbox':
                Message.find({addressee: req.session.user}, function (err, messages) {
                    if (err) return next (err);
                    res.send(messages);
                });
                break;

            case 'unread':
                Message.find({addressee: req.session.user, status: 'unread'}, function (err, messages) {
                    if (err) return next(err);
                    res.send(messages);
                });
                break;

            case 'sent':
                Message.find({sender: req.session.user}, function (err, messages) {
                    if (err) return next(err);
                    res.send(messages);
                });
                break;

            case 'history':
                var UserOne = req.query.users.split('&')[0];
                var UserTwo = req.query.users.split('&')[1];

                if (UserOne == UserTwo) {
                    Message.find({sender: UserOne, addressee: UserOne}, function (err, messagesArrTwo) {
                        if (err) return next(err);
                        res.send(messagesArrTwo);
                    });
                } else {
                    Message.find({sender: UserTwo, addressee: UserOne}, function (err, messagesArrTwo) {
                        if (err) return next(err);
                        Message.find({sender: UserOne, addressee: UserTwo}, function (err, messagesArrOne) {
                            if (err) return next(err);
                            res.send(messagesArrOne.concat(messagesArrTwo));
                        });
                    });
                }
                break;
        }
    });

    app.get('/messages/:_id', function (req, res, next) {
        var _id = req.params._id;
        Message.findById(_id, function(err, message) {
            if (err) return next(err);
            if (message.addressee == req.session.user) {
                Message.findByIdAndUpdate(_id, {status: 'read'}, {new: true}, function (err, message) {
                    res.send([message, req.session.user]);
                });
            } else {
                res.send([message, req.session.user]);
            }
        });
    });

    app.get('/users', function (req, res, next) {
        User.find({}, function (err, users) {
            if(err) return next(err);
            res.send(users);
        });
    });

    app.get('/template/:messageType', function(req, res) {
        res.render(req.params.messageType);
    });

    app.get('/mail', function(req, res) {
        res.render('mail');
    });

    app.get('/*', function(req, res) {
        res.render('index');
    });
};