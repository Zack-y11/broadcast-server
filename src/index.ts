import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

const clients: Array<Socket> = [];
io.on('connection', (socket)=>{
    clients.push(socket);
    console.log('New user connected');

    socket.on('message', (message: string)=>{
        console.log('Received message: ', message);

        socket.broadcast.emit('message', message);
    })

    socket.on('disconnect', ()=>{
        const index = clients.indexOf(socket);
        if(index !== -1) clients.splice(index,1);
        console.log('User disconnected');
    })  
})

server.listen(3000, ()=>{
    console.log('Server is running on port 3000');
})
