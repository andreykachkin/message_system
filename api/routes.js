var bodyParser = require('body-parser');
var config = require('./configBD');
var User = require('./models/user').User;
var Message = require('./models/message').Message;
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

module.exports = function (app) {
    app.post('/registration', urlencodedParser, function(req, res, next){
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

    app.post('/authentication', urlencodedParser, function(req, res, next){
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

    app.post('/readMessage', jsonParser, function(req, res, next){
        var _id = req.body._id;

        Message.findOneAndUpdate({_id : _id}, {status: 'read'}, function(err){
            if (err) return next(err);
            res.sendStatus(200);
        });
    });

    app.post('/sendMessage', jsonParser, function(req, res, next) {
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

    app.get('/inboxMessage', function (req, res, next) {
        Message.find({addressee: req.session.user}, function (err, messages) {
            if(err) return next(err);
            res.send(messages);
        });
    });

    app.get('/unreadMessage', function (req, res, next) {
        Message.find({addressee: req.session.user, status: 'unread'}, function (err, messages) {
            if (err) return next(err);
            res.send(messages);
        });
    });

    app.get('/sentMessage', function (req, res, next) {
       Message.find({sender: req.session.user}, function (err, messages) {
            if (err) return next(err);
           res.send(messages);
        });
    });

    app.get('/message/:_id', function (req, res, next) {
        Message.find({_id: req.params._id}, function (err, message) {
            if (err) return next(err);
            res.send(message.concat(req.session.user));
        })
    });

    app.get('/users', function (req, res, next) {
        User.find({}, function (err, users) {
            if(err) return next(err);
            res.send(users);
        });
    });

    app.get('/history/:users', function (req, res, next) {
        var UserOne = req.params.users.split('+')[0];
        var UserTwo = req.params.users.split('+')[1];

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
    });

    app.get('/messages/:messageType', function(req, res) {
        res.render(req.params.messageType);
    });

    app.get('/registration', function(req, res) {
        res.render('registration');
    });

    app.get('/mail', function(req, res) {
        res.render('mail');
    });

    app.get('/*', function(req, res) {
        res.render('index');
    });
};