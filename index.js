var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var cors = require('cors');
var fs = require('fs');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var firebaseadmin = require("firebase-admin");
var helper = require('./module/helper/helper');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/chat';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

mongoose.on('connected', () => {
    console.log('Mongo Connected.','Created database "chat"');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(cors());

var userRoute = require('./module/users/users.route');

app.use('/user',userRoute);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.use(function (socket, next) {
    if (socket.request._query['userId'] != 'null' || socket.request._query['userId'] != undefined) {
        let userID = socket.request._query['userId'];
        let socketId = socket.id;
        const data = {
            id: userID,
            socketId: socketId
        }

        helper.updateuserstatus(userId, socket.id,'online' (error, response) => {
        });

        next();
    }
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', (data) => {
    helper.updateuserstatusonsocket(socket.id,'offline' (error, response) => {
    });
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});