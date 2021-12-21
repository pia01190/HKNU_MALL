const express = require('express')
const app = express()



var server = require('http').createServer(app);



// 여기서 socket 은 개인 사용자 자신을 나타낸다 ( 사용자 개개인의 request source 라고 생각해도 될 듯 하다)
exports.chatting = function(req, res) {
    var io = require('socket.io')(server);

    res.render('chatting')

    // namespace /chat에 접속한다.
    io.on('connection', function(socket) {

        // 접속한 클라이언트의 정보가 수신되면
        socket.on('login', function(data) {
            console.log('Client logged-in:\n name:' + data.name + '\n userid: ' + data.userid);

            // socket에 클라이언트 정보를 저장한다
            socket.name = data.name;
            socket.userid = data.userid;

            // 접속된 모든 클라이언트에게 메시지를 전송한다
            io.emit('login', data.name);
        });

        // 클라이언트로부터의 메시지가 수신되면
        socket.on('chat', function(data) {
            console.log('Message from %s: %s', socket.name, data.msg);

            var msg = {
                from: {
                    name: socket.name,
                    userid: socket.userid
                },
                msg: data.msg
            };

            // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
            socket.broadcast.emit('chat', msg);


        });

        // force client disconnect from server
        socket.on('forceDisconnect', function() {
            socket.disconnect();
        })

        socket.on('disconnect', function() {
            console.log('user disconnected: ' + socket.name);
        });
        socket.on('disconnect', function() {
            delete usernames[socket.username];
            var userlist = new Array();
            for (var name in usernames) {
                userlist.push(usernames[name]);
            }
            io.sockets.emit('updateuser', userlist);
            socket.broadcast.emit('servernoti', 'red', socket.username + ' has disconnected');
            socket.leave(socket.room);
        });
    });
    var claim = function(name) {
        if (!name || usernames[name]) {
            return false;
        } else {
            usernames[name] = true;
            return true;
        }
    };

    // find the lowest unused "guest" name and claim it
    var getGuestName = function() {
        var name,
            nextUserId = 1;
        do {
            name = 'Guest' + nextUserId;
            nextUserId += 1;
        } while (!claim(name));
        return name;
    };

    socket.on('guestjoin', function(roomname) {
        var username = getGuestName();

        socket.username = username;
        socket.room = roomname;
        usernames[username] = username;
        socket.join(roomname);
        socket.emit('servernoti', 'green', 'you has connected J-Chat');

        var userlist = new Array();

        for (var name in usernames) {
            userlist.push(usernames[name]);
        }

        io.sockets.in(socket.room).emit('updateuser', userlist);

        socket.broadcast.to(roomname).emit('servernoti', 'green', username + ' has connected to ' + roomname);
        if (roomname != 'lobby')
            socket.emit('updaterooms', rooms, roomname);
    });

    socket.on('disconnect', function() {
        delete usernames[socket.username];
        var userlist = new Array();
        for (var name in usernames) {
            userlist.push(usernames[name]);
        }
        io.sockets.emit('updateuser', userlist);
        socket.broadcast.emit('servernoti', 'red', socket.username + ' has disconnected');
        socket.leave(socket.room);
    });



    console.log('Connected ');

}