// require module
const socket = require("socket.io");
const http = require("http");
const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
//-----------------------------------------------------------------------------------
const port = process.env.port || 3000;
//-----------------------------------------------------------------------------------
// create server và bắt đầu kết nối socket.io
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
server.listen(port);
//handle các request để lấy file css và scipts
app.use(express.static('public'));

//-----------------------------------------------------------------------------------
// handle socket.io connection
io.on("connection",(socket)=>{
    console.log(socket.id + " has connected")
    socket.on("disconnect", socket =>{
        console.log(socket.id +" has disconnected")
    })
    // handle incoming message from client
    socket.on("sendMessage", (data)=>{
        // broadcast message to everyone
        socket.broadcast.emit("broadCastMessage",{
            message: data.message
        } )
    })
})


//handle some routes
app.get("/",(req,res)=>{
    res.sendFile("chatroom.html",{root: __dirname+'/views'})
})