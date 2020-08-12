const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const socket = require('socket.io');

const messages = [];
const users = [];

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
});


const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

const io = socket(server);

io.on('connection', (socket) => {
    console.log('New client! Its id – ' + socket.id);
    socket.on('message', (message) => {
        console.log('Oh, I\'ve got something from ' + socket.id);
        messages.push(message);
        socket.broadcast.emit('message', message);
    });
    socket.on('join', (loggedUsers) => {
        users.push({
            user: loggedUsers.userName,
            id: socket.id,
        });
    });
    socket.on('newUser', (message) => {
        socket.broadcast.emit('newUser', message);
    });
    socket.on('disconnect', () => {

        const disconnectUser = users.find(item => item.id == socket.id);
        if (disconnectUser) {
            socket.broadcast.emit('removeUser', {
                author: "ChatBot",
                content: `${disconnectUser.user} has left the conversation!`
            });
        }

        const index = users.findIndex(item => item.id == socket.id)
        users.splice(index, 1);
    });
    console.log('I\'ve added a listener on message event \n');
});