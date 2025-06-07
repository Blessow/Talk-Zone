const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const path = require('path');

let users = {};

app.use(express.static(path.join(__dirname, '../app')));

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('username',(user)=>{
        users[socket.id] = user;
        console.log(`${user}` + ' has joined the chat');
        io.emit('user joined', `${user} has joined the chat`);
    })
    socket.on('chat message', (msg) => {
        const user = users[socket.id]
        if(user){
        socket.broadcast.emit('message',`${user}: ${msg}`);
        }
    });
    socket.on('disconnect', () => {
        const user = users[socket.id]
        if(user){
            console.log(`${user} has left the chat`);
            socket.broadcast.emit('user left', `${user} has left the chat`);
            delete users[socket.id];
        }
    });
});

server.listen(3000,()=>{
    console.log('Server is running on http://localhost:3000');
});
