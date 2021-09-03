const socket = require("socket.io");
const http = require("http");
const path = require("path");
const express = require("express");

const port = process.env.port || 3000;

const server = http.createServer();
const app = express();
app.use(express.static('public'));

app.listen(3000);

app.get("/",(req,res)=>{
    res.sendFile("index.html",{root: __dirname+'/views'})
})
