const mysql = require('mysql');
const express = require('express')
const app = express()
const session = require('express-session');
const moment = require('moment')
const BoardsModel = require('../../models/Board')
const MystoreModel = require('../../models/Mystore');
const MySQLStore = require("express-mysql-session")(session);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

module.exports = (socket, io) => {

  let room = ['room1', 'room2'];
  let a = 0;


  socket.on('disconnect', () => {
    console.log('user disconnected');
  });


  socket.on('leaveRoom', async (num, name) => {
    await socket.leave(room[num])
    console.log(name + ' leave a ' + room[num]);
    io.to(room[num]).emit('leaveRoom1', num, name);
  });


  socket.on('joinRoom', async (num, name) => {
    await socket.join(room[num])
    console.log(name + ' join a ' + room[num]);
    io.to(room[num]).emit('joinRoom1', num, name);
  });


  socket.on('chat message', (num, name, msg) => {
    a = num;
    io.to(room[a]).emit('chat message', name, msg);
  });
}

